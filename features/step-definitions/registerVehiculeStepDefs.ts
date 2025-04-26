// First group: Testing framework
import { Given, Then, When } from "@cucumber/cucumber";
import { expect } from "expect";

// Second group: Domain
import { Fleet } from "../../src/Domain/Models/Fleet";
import { User } from "../../src/Domain/Models/User.js";
import { Vehicle } from "../../src/Domain/Models/Vehicle.js";
import { VehicleType } from "../../src/Domain/Types/VehicleType.js";

// Third group: Commands
import {
  InitializeFleet,
  InitializeFleetHandler,
} from "../../src/App/Commands/initializeFleet.js";
import {
  RegisterVehicle,
  RegisterVehicleHandler,
} from "../../src/App/Commands/registerVehicle.js";

// Fourth group: Queries
import { GetFleet, GetFleetHandler } from "../../src/App/Queries/getFleet.js";

// Fifth group: Infrastructure
import { InMemoryFleetRepository } from "../../src/Infra/InMemoryFleetRepository.js";

let fleetId;
let otherFleetId;
const user: User = User.create();
const otherUser: User = User.create();
let vehicle: Vehicle;
const repository = new InMemoryFleetRepository();

function createFleet(userObj: User) {
  const initializeFleet = new InitializeFleet(userObj.id);
  const handler = new InitializeFleetHandler(repository);
  return handler.handle(initializeFleet);
}

/**
 * Scenario: I can register a vehicule
 */
Given("my fleet", function (): void {
  fleetId = createFleet(user);
});

Given("a vehicle", function (): void {
  vehicle = Vehicle.create(VehicleType.CAR);
});

function registerVehicleCommandFleet(
  fleetId: string,
  userId: string,
  vehicle: Vehicle,
  repository: InMemoryFleetRepository,
): void {
  const registerCommand = new RegisterVehicle(fleetId, userId, vehicle);
  const handler = new RegisterVehicleHandler(repository);
  handler.handle(registerCommand);
}

When("I register this vehicle into my fleet", function (): void {
  registerVehicleCommandFleet(fleetId, user.id, vehicle, repository);
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
  registerVehicleCommandFleet(fleetId, user.id, vehicle, repository);
});

When("I try to register this vehicle into my fleet", function () {
  try {
    registerVehicleCommandFleet(fleetId, user.id, vehicle, repository);
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

/**
 * Scenario: Same vehicle can belong to more than one fleet
 */
Given("the fleet of another user", function () {
  otherFleetId = createFleet(otherUser);
});
