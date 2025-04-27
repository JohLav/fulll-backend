// First group: Testing framework
import { Given, Then, When } from "@cucumber/cucumber";
import { expect } from "expect";

// Second group: Domain
import { Fleet } from "../../src/Domain/Models/Fleet.js";
import { FleetRepository } from "../../src/Domain/Repositories/FleetRepository.js";
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

// --------------------------------------------------
// Setup
// --------------------------------------------------

function initializeFleetForUser(repository: FleetRepository, user: User) {
  const initializeFleet = new InitializeFleet(user.id);
  const handler = new InitializeFleetHandler(repository);
  return handler.handle(initializeFleet);
}

function registerVehicleInFleet(
  repository: FleetRepository,
  fleetId: string,
  userId: string,
  vehicle: Vehicle,
): void {
  const registerCommand = new RegisterVehicle(fleetId, userId, vehicle);
  const handler = new RegisterVehicleHandler(repository);
  handler.handle(registerCommand);
}

function retrieveFleet(repository: FleetRepository, fleetId: string): Fleet {
  const getFleetQuery = new GetFleet(fleetId);
  const handler = new GetFleetHandler(repository);
  return handler.handle(getFleetQuery);
}

// --------------------------------------------------
// Step Definitions
// --------------------------------------------------

Given("my fleet", function (): void {
  const user: User = User.create();
  this.context = { user, repository: new InMemoryFleetRepository() };
  this.context.fleetId = initializeFleetForUser(this.context.repository, user);
});

Given("the fleet of another user", function () {
  const otherUser: User = User.create();
  this.context.otherUser = otherUser;
  this.context.otherFleetId = initializeFleetForUser(
    this.context.repository,
    otherUser,
  );
});

Given("a vehicle", function (): void {
  this.context.vehicle = Vehicle.create(VehicleType.CAR);
});

Given("I have registered this vehicle into my fleet", function () {
  registerVehicleInFleet(
    this.context.repository,
    this.context.fleetId,
    this.context.user.id,
    this.context.vehicle,
  );
});

Given(
  "this vehicle has been registered into the other user's fleet",
  function () {
    registerVehicleInFleet(
      this.context.repository,
      this.context.otherFleetId,
      this.context.otherUser.id,
      this.context.vehicle,
    );
  },
);

When("I register this vehicle into my fleet", function (): void {
  registerVehicleInFleet(
    this.context.repository,
    this.context.fleetId,
    this.context.user.id,
    this.context.vehicle,
  );
});

When("I try to register this vehicle into my fleet", function () {
  try {
    registerVehicleInFleet(
      this.context.repository,
      this.context.fleetId,
      this.context.user.id,
      this.context.vehicle,
    );
    this.context.registrationSucceeded = true;
    this.context.registrationError = null;
  } catch (error) {
    this.context.registrationSucceeded = false;
    this.context.registrationError = error;
  }
});

Then("this vehicle should be part of my vehicle fleet", function (): void {
  const fleet: Fleet = retrieveFleet(
    this.context.repository,
    this.context.fleetId,
  );

  expect(fleet.id).toBe(this.context.fleetId);
  expect(fleet.vehicles).toEqual(
    expect.arrayContaining([expect.objectContaining(this.context.vehicle)]),
  );
});

Then(
  "I should be informed that this vehicle has already been registered into my fleet",
  function (): void {
    expect(this.context.registrationSucceeded).toBe(false);
    const expectedMessage = `Vehicle with ID ${this.context.vehicle.id} is already registered in the fleet`;

    expect(this.context.registrationError.message).toMatch(expectedMessage);
  },
);
