import { Given, Then, When } from "@cucumber/cucumber";
import {
  InitializeFleet,
  InitializeFleetHandler,
} from "../../src/App/Commands/initializeFleet.js";
import { InMemoryFleetRepository } from "../../src/Infra/InMemoryFleetRepository.js";
import { Vehicle } from "../../src/Domain/Vehicle.js";
import {
  RegisterVehicle,
  RegisterVehicleHandler,
} from "../../src/App/Commands/registerVehicle.js";
import { Fleet } from "../../src/Domain/Fleet.js";
import { GetFleet, GetFleetHandler } from "../../src/App/Queries/getFleet.js";
import { expect } from "expect";

let fleetId;
let vehicle;
const repository = new InMemoryFleetRepository();

/**
 * Scenario: I can register a vehicule
 */
Given("my fleet", function (): void {
  const initializeFleet = new InitializeFleet();
  const handler = new InitializeFleetHandler(repository);
  fleetId = handler.handle(initializeFleet);
});

Given("a vehicle", function (): void {
  vehicle = Vehicle.create("Car");
});

function registerVehicleCommandFleet(
  fleetId: string,
  vehicle: Vehicle,
  repository: InMemoryFleetRepository,
): void {
  const registerCommand = new RegisterVehicle(fleetId, vehicle);
  const handler = new RegisterVehicleHandler(repository);
  handler.handle(registerCommand);
}

When("I register this vehicle into my fleet", function (): void {
  registerVehicleCommandFleet(fleetId, vehicle, repository);
});

function getFleet(): Fleet {
  const getFleetQuery = new GetFleet(fleetId);
  const handler = new GetFleetHandler(repository);
  return handler.handle(getFleetQuery);
}

Then("this vehicle should be part of my vehicle fleet", function (): void {
  const fleet: Fleet = getFleet();

  expect(fleet.id).toBe(fleetId);
  expect(fleet.vehicles).toEqual(
    expect.arrayContaining([expect.objectContaining(vehicle)]),
  );
});

/**
 * Scenario: I can't register same vehicle twice
 */
Given("I have registered this vehicle into my fleet", function () {
  registerVehicleCommandFleet(fleetId, vehicle, repository);
});

When("I try to register this vehicle into my fleet", function () {
  try {
    registerVehicleCommandFleet(fleetId, vehicle, repository);
    this.registrationSucceeded = true;
    this.registrationError = null;
  } catch (error) {
    this.registrationSucceeded = false;
    this.registrationError = error;
  }
});
Then(
  "I should be informed that this vehicle has already been registered into my fleet",
  function (): void {
    expect(this.registrationSucceeded).toBe(false);
    expect(this.registrationError.message).toMatch(
      "Vehicle is already registered in the fleet",
    );
  },
);
