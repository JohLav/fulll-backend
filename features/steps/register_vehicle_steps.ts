// First group: Testing framework
import { Given, Then, When } from "@cucumber/cucumber";
import { expect } from "chai";

// Second group: Domain
import { Fleet } from "../../src/Domain/Models/Fleet.js";
import { User } from "../../src/Domain/Models/User.js";
import { VehicleAlreadyRegisteredError } from "../../src/Domain/Errors/VehicleAlreadyRegisteredError.js";

// Third group: Infrastructure
import { InMemoryFleetRepository } from "../../src/Infra/Repositories/InMemoryFleetRepository";

// Fourth group: Helpers
import { initializeFleetForUser } from "./shared/initializeFleetForUser.js";
import { registerVehicleInFleet } from "./shared/registerVehicleInFleet.js";
import { retrieveFleet } from "./shared/retrieveFleet.js";

Given("the fleet of another user", function () {
  const otherUser: User = User.create();
  this.context.otherUser = {
    otherUser,
    fleetRepository: new InMemoryFleetRepository(),
  };
  this.context.otherFleetId = initializeFleetForUser(
    this.context.fleetRepository,
    otherUser,
  );
});

Given(
  "this vehicle has been registered into the other user's fleet",
  function () {
    registerVehicleInFleet(
      this.context.fleetRepository,
      this.context.otherFleetId,
      this.context.otherUser.id,
      this.context.vehicle,
    );
  },
);

When("I register this vehicle into my fleet", function (): void {
  registerVehicleInFleet(
    this.context.fleetRepository,
    this.context.fleetId,
    this.context.user.id,
    this.context.vehicle,
  );
});

When("I try to register this vehicle into my fleet", function () {
  try {
    registerVehicleInFleet(
      this.context.fleetRepository,
      this.context.fleetId,
      this.context.user.id,
      this.context.vehicle,
    );
    this.context.registrationSuccess = true;
    this.context.registrationError = null;
  } catch (error) {
    this.context.registrationSuccess = false;
    this.context.registrationError = error;
  }
});

Then("this vehicle should be part of my vehicle fleet", function (): void {
  const fleet: Fleet = retrieveFleet(
    this.context.fleetRepository,
    this.context.fleetId,
  );

  expect(fleet.id).to.equal(this.context.fleetId);
  expect(fleet.vehicles).to.deep.include(this.context.vehicle);
});

Then(
  "I should be informed that this vehicle has already been registered into my fleet",
  function (): void {
    expect(this.context.registrationSuccess).to.equal(false);

    const expected = new VehicleAlreadyRegisteredError(this.context.vehicle.id);

    expect(this.context.registrationError.message).to.equal(expected.message);
  },
);
