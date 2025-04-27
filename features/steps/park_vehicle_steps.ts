import { Given } from "@cucumber/cucumber";

Given("a location", function () {
  this.context.location = {
    latitude: 48.8566,
    longitude: 2.3522,
  };
});
