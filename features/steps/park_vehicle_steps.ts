// First group: Testing framework
import { Given, When } from "@cucumber/cucumber";

Given("a location", function () {
  this.context.vehicle.location = {
    latitude: 48.8566,
    longitude: 2.3522,
  };
});
When("I park my vehicle at this location", function () {});
