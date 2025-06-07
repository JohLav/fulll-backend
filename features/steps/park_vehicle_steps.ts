// First group: Testing framework
import { Given, Then, When } from "@cucumber/cucumber";
import { World } from "cucumber";
import { expect } from "chai";

// Second group: Domain
import { Location } from "../../src/Domain/Models/Location";
import { VehicleAlreadyParkedAtThisLocationError } from "../../src/Domain/Errors/VehicleAlreadyParkedAtThisLocationError";

// Third group: App
import {
  ParkVehicle,
  ParkVehicleHandler,
} from "../../src/App/Commands/parkVehicle";

import { retrieveLocation } from "./shared/retrieveLocation";

Given("a location", async function (): Promise<void> {
  this.context.location = Location.create(48.8566, 2.3522);
});

Given(
  "my vehicle has been parked in this location",
  async function (): Promise<void> {
    await parkVehicleInFleetAtThisLocation(this.context);
  },
);

When("I park my vehicle at this location", async function (): Promise<void> {
  await parkVehicleInFleetAtThisLocation(this.context);
});

When(
  "I try to park my vehicle at this location",
  async function (): Promise<void> {
    try {
      await parkVehicleInFleetAtThisLocation(this.context);

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
      this.context.vehicle.plateNumber,
      this.context.fleetId,
      this.context.location,
    );

    expect(this.context.parkingAttemptError).to.deep.equal(expected);
  },
);

async function parkVehicleInFleetAtThisLocation(context: World) {
  const parkVehicleCommand = new ParkVehicle(
    context.fleetId,
    context.vehicle.plateNumber,
    context.location,
  );
  const handler = new ParkVehicleHandler(context.repository);
  await handler.handle(parkVehicleCommand);
}
