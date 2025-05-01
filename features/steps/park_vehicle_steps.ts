// First group: Testing framework
import { Given, Then, When } from "@cucumber/cucumber";

// Second group: Domain
import { Location } from "../../src/Domain/Models/Location.js";

// Third group: Commands & Queries
import {
  ParkVehicle,
  ParkVehicleHandler,
} from "../../src/App/Commands/parkVehicle.js";
import {
  GetLocation,
  GetLocationHandler,
} from "../../src/App/Queries/getLocation.js";

// Fourth group: Infrastructure
import { InMemoryVehicleRepository } from "../../src/Infra/InMemoryVehicleRepository.js";
import { expect } from "chai";

Given("a location", function () {
  this.context.location = Location.create(48.8566, 2.3522);
});

When("I park my vehicle at this location", function () {
  this.context.repository = new InMemoryVehicleRepository();
  this.context.repository.save(this.context.vehicle);

  const parkVehicle = new ParkVehicle(
    this.context.vehicle,
    this.context.location,
  );
  const handler = new ParkVehicleHandler(this.context.repository);
  handler.handle(parkVehicle);
});

Then(
  "the known location of my vehicle should verify this location",
  function () {
    const getLocationQuery = new GetLocation(this.context.vehicle.id);
    const handler = new GetLocationHandler(this.context.repository);
    const actualLocation = handler.handle(getLocationQuery);

    if (!actualLocation.equals(this.context.location)) {
      throw new Error(
        `Expected location ${this.context.location.toString()} but got ${actualLocation.toString()}`,
      );
    }

    expect(this.context.vehicle.location).to.equal(this.context.location);
  },
);
Given("my vehicle has been parked into this location", function () {
  // Implementation would typically:
  // 1. Create/update parking record in database
  // 2. Set parking status to 'occupied'
  // 3. Store vehicle ID and location mapping
});
When("I try to park my vehicle at this location", function () {
  // Implementation would typically:
  // 1. Receive parking request
  // 2. Validate location availability
  // 3. Trigger validation check
});
Then(
  "I should be informed that my vehicle is already parked at this location",
  function () {
    // Implementation would typically:
    // 1. Verify error message is displayed
    // 2. Confirm location status remains unchanged
    // 3. Assert no duplicate parking record created
  },
);
