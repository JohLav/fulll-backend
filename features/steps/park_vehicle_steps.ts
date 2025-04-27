// First group: Testing framework
import { Given, Then, When } from "@cucumber/cucumber";
import { expect } from "expect";

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

    expect(this.context.vehicle.location).toEqual(this.context.location);

    // const expectedMessage =
    //   `The known location for vehicle with ID ${this.context.vehicle.id} is verified`;
    //
    // expect(this.context.location.message).toMatch(expectedMessage);
  },
);
