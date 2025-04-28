// First group: Testing framework
import { Given, Then, When } from "@cucumber/cucumber";
import { expect } from "chai";

// Second group: Domain
import { Fleet } from "../../src/Domain/Models/Fleet.js";
import { User } from "../../src/Domain/Models/User.js";
import { Vehicle } from "../../src/Domain/Models/Vehicle.js";
import { VehicleType } from "../../src/Domain/Types/VehicleType.js";

// Third group: Infrastructure
import { InMemoryFleetRepository } from "../../src/Infra/InMemoryFleetRepository.js";

// Fourth group: Helpers
import { initializeFleetForUser } from "./shared/initializeFleetForUser.js";
import { registerVehicleInFleet } from "./shared/registerVehicleInFleet.js";
import { retrieveFleet } from "./shared/retrieveFleet.js";

// --------------------------------------------------
// Steps
// --------------------------------------------------

Given("my fleet", function (): void {
  const user: User = User.create();
  this.context = { user, repository: new InMemoryFleetRepository() };
  this.context.fleetId = initializeFleetForUser(this.context.repository, user);
});

Given("the fleet of another user", function () {
  const otherUser: User = User.create();
  this.context.otherUser = {
    otherUser,
    repository: new InMemoryFleetRepository(),
  };
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

  expect(fleet.id).to.equal(this.context.fleetId);
  expect(fleet.vehicles).to.deep.include(this.context.vehicle);
});

Then(
  "I should be informed that this vehicle has already been registered into my fleet",
  function (): void {
    expect(this.context.registrationSucceeded).to.equal(false);

    const expectedMessage = `Vehicle with ID ${this.context.vehicle.id} is already registered in the fleet`;

    expect(this.context.registrationError.message).to.equal(expectedMessage);
  },
);
