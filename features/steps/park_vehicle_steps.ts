// First group: Testing framework
import { Given, Then, When } from "@cucumber/cucumber";
import { expect } from "chai";

// Second group: Domain
import { Location } from "../../src/Domain/Models/Location.js";
import { VehicleAlreadyParkedError } from "../../src/Domain/Errors/VehicleAlreadyParkedError.js";

// Fifth group: Helpers
import { parkVehicleAtLocation } from "./shared/parkVehicleAtLocation.js";
import { retrieveLocation } from "./shared/retrieveLocation.js";

Given("a location", function () {
  this.context.location = Location.create(48.8566, 2.3522);
  this.context.repository.save(this.context.vehicle);
});

Given("my vehicle has been parked in this location", function () {
  parkVehicleAtLocation(
    this.context.repository,
    this.context.fleetId,
    this.context.vehicle,
    this.context.location,
  );
});

When("I park my vehicle at this location", function () {
  parkVehicleAtLocation(
    this.context.repository,
    this.context.fleetId,
    this.context.vehicle,
    this.context.location,
  );
});

When("I try to park my vehicle at this location", function () {
  try {
    parkVehicleAtLocation(
      this.context.repository,
      this.context.fleetId,
      this.context.vehicle,
      this.context.location,
    );
    this.context.parkingAttempt = true;
    this.context.parkingAttemptError = null;
  } catch (error) {
    this.context.parkingAttempt = false;
    this.context.parkingAttemptError = error;
  }
});

Then(
  "the known location of my vehicle should verify this location",
  function () {
    const actualLocation = retrieveLocation(
      this.context.repository,
      this.context.fleetId,
      this.context.vehicle.plateNumber,
    );

    if (!actualLocation.equals(this.context.location)) {
      throw new Error(
        `Expected location ${this.context.location.toString()} but got ${actualLocation.toString()}`,
      );
    }

    expect(this.context.vehicle.location).to.equal(this.context.location);
  },
);

Then(
  "I should be informed that my vehicle is already parked at this location",
  function () {
    expect(this.context.parkingAttempt).to.equal(false);

    const expected = new VehicleAlreadyParkedError(this.context.vehicle.id);

    expect(this.context.parkingAttemptError.message).to.equal(expected.message);
  },
);
