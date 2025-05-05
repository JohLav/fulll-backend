// First group: Testing framework
import { Given, Then, When } from "@cucumber/cucumber";
import { expect } from "chai";

// Second group: Domain
import { User } from "../../src/Domain/Models/User.js";
import { VehicleAlreadyRegisteredError } from "../../src/Domain/Errors/VehicleAlreadyRegisteredError.js";

// Third group: Application
import { FleetNotFoundError } from "../../src/App/Errors/FleetNotFoundError.js";

// Fourth group: Helpers
import { initializeFleetForUser } from "./shared/initializeFleetForUser.js";
import { registerVehicleInFleet } from "./shared/registerVehicleInFleet.js";
import { retrieveFleet } from "./shared/retrieveFleet.js";

Given("the fleet of another user", async function (): Promise<void> {
  this.context.otherUser = User.create(crypto.randomUUID());
  this.context.otherFleetId = await initializeFleetForUser(
    this.context.repository,
    this.context.otherUser,
  );
});

Given(
  "this vehicle has been registered into the other user's fleet",
  async function (): Promise<void> {
    await registerVehicleInFleet(
      this.context.repository,
      this.context.otherFleetId,
      this.context.otherUser.id,
      this.context.vehicle,
    );
  },
);

When("I register this vehicle into my fleet", async function (): Promise<void> {
  await registerVehicleInFleet(
    this.context.repository,
    this.context.fleetId,
    this.context.user.id,
    this.context.vehicle,
  );
});

When(
  "I try to register this vehicle into my fleet",
  async function (): Promise<void> {
    try {
      await registerVehicleInFleet(
        this.context.repository,
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
  },
);

Then(
  "this vehicle should be part of my vehicle fleet",
  async function (): Promise<void> {
    const fleet = await retrieveFleet(
      this.context.repository,
      this.context.fleetId,
    );
    if (!fleet) {
      throw new FleetNotFoundError(this.context.fleetId);
    }

    expect(fleet.id).to.equal(this.context.fleetId);
    expect(fleet.vehicles).to.deep.include(this.context.vehicle);
  },
);

Then(
  "I should be informed that this vehicle has already been registered into my fleet",
  function (): void {
    expect(this.context.registrationSuccess).to.equal(false);

    const expected = new VehicleAlreadyRegisteredError(this.context.vehicle.id);

    expect(this.context.registrationError.message).to.equal(expected.message);
  },
);
