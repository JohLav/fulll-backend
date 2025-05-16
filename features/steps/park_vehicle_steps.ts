// First group: Testing framework
import { Given, Then, When } from "@cucumber/cucumber";
import { expect } from "chai";

// Second group: Domain
import { Location } from "../../src/Domain/Models/Location.js";
import { VehicleAlreadyParkedAtThisLocationError } from "../../src/Domain/Errors/VehicleAlreadyParkedAtThisLocationError.js";

// Fifth group: Helpers
import { parkVehicleAtLocation } from "./shared/parkVehicleAtLocation.js";
import { retrieveLocation } from "./shared/retrieveLocation.js";

Given("a location", async function (): Promise<void> {
  this.context.location = Location.create(48.8566, 2.3522);
});

Given(
  "my vehicle has been parked in this location",
  async function (): Promise<void> {
    await parkVehicleAtLocation(
      this.context.repository,
      this.context.fleetId,
      this.context.vehicle.plateNumber,
      this.context.location,
    );
  },
);

When("I park my vehicle at this location", async function (): Promise<void> {
  await parkVehicleAtLocation(
    this.context.repository,
    this.context.fleetId,
    this.context.vehicle.plateNumber,
    this.context.location,
  );
});

When(
  "I try to park my vehicle at this location",
  async function (): Promise<void> {
    try {
      await parkVehicleAtLocation(
        this.context.repository,
        this.context.fleetId,
        this.context.vehicle.plateNumber,
        this.context.location,
      );
      this.context.parkingAttemptError = null;
    } catch (error) {
      this.context.parkingAttemptError = error;
    }
  },
);

Then(
  "the known location of my vehicle should verify this location",
  async function (): Promise<void> {
    const actualLocation = await retrieveLocation(
      this.context.repository,
      this.context.fleetId,
      this.context.vehicle.plateNumber,
    );

    expect(actualLocation).to.deep.equal(this.context.location);
  },
);

Then(
  "I should be informed that my vehicle is already parked at this location",
  function (): void {
    const expected = new VehicleAlreadyParkedAtThisLocationError(
      this.context.vehicle.id,
      this.context.vehicle.plateNumber,
      this.context.fleetId,
      this.context.location.latitude,
      this.context.location.longitude,
      this.context.location.altitude,
    );

    expect(this.context.parkingAttemptError).to.deep.equal(expected);
  },
);
