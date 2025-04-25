import { Given, Then, When } from "@cucumber/cucumber";
import {
  InitializeFleet,
  InitializeFleetHandler,
} from "../../src/App/Commands/initializeFleet.js";
import { InMemoryFleetRepository } from "../../src/Domain/Repositories/InMemoryFleetRepository.js";

Given("my fleet", function () {
  const repository = new InMemoryFleetRepository();
  const handler = new InitializeFleetHandler(repository);
  handler.handle(new InitializeFleet());
});

Given("a vehicle", function () {
  throw new Error("Not implemented");
});

When("I register this vehicle into my fleet", function () {
  throw new Error("Not implemented");
});

Then("this vehicle should be part of my vehicle fleet", function () {
  throw new Error("Not implemented");
});
