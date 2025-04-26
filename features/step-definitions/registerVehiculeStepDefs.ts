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
let vehicle;

// --------------------------------------------------
// Global Setup
// --------------------------------------------------

const repository = new InMemoryFleetRepository();

function initializeFleetForUser(user: User) {
  const initializeFleet = new InitializeFleet(user.id);
  const handler = new InitializeFleetHandler(repository);
  return handler.handle(initializeFleet);
}

function registerVehicleInFleet(
  fleetId: string,
  userId: string,
  vehicle: Vehicle,
): void {
  const registerCommand = new RegisterVehicle(fleetId, userId, vehicle);
  const handler = new RegisterVehicleHandler(repository);
  handler.handle(registerCommand);
}

function retrieveFleet(fleetId: string): Fleet {
  const getFleetQuery = new GetFleet(fleetId);
  const handler = new GetFleetHandler(repository);
  return handler.handle(getFleetQuery);
}

// --------------------------------------------------
// Step Definitions
// --------------------------------------------------

/**
 * Scenario: I can register a vehicule
 */
Given("my fleet", function (): void {
  fleetId = initializeFleetForUser(user);
});

Given("a vehicle", function (): void {
  vehicle = Vehicle.create(VehicleType.CAR);
});

When("I register this vehicle into my fleet", function (): void {
  registerVehicleInFleet(fleetId, user.id, vehicle);
});

Then("this vehicle should be part of my vehicle fleet", function (): void {
  const fleet: Fleet = retrieveFleet(fleetId);

  expect(fleet.id).toBe(fleetId);
  expect(fleet.vehicles).toEqual(
    expect.arrayContaining([expect.objectContaining(vehicle)]),
  );
});

/**
 * Scenario: I can't register same vehicle twice
 */
Given("I have registered this vehicle into my fleet", function () {
  registerVehicleInFleet(fleetId, user.id, vehicle);
});

When("I try to register this vehicle into my fleet", function () {
  try {
    registerVehicleInFleet(fleetId, user.id, vehicle);
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
  otherFleetId = initializeFleetForUser(otherUser);
});

Given(
  "this vehicle has been registered into the other user's fleet",
  function () {
    registerVehicleInFleet(otherFleetId, otherUser.id, vehicle);
  },
);
