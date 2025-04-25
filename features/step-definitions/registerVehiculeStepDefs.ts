import { Given, Then, When } from "@cucumber/cucumber";
import {
  InitializeFleet,
  InitializeFleetHandler,
} from "../../src/App/Commands/initializeFleet.js";
import { InMemoryFleetRepository } from "../../src/Infra/InMemoryFleetRepository.js";
import { Vehicle } from "../../src/Domain/Vehicle.js";
import {
  RegisterVehicle,
  RegisterVehicleHandler,
} from "../../src/App/Commands/registerVehicle.js";

let fleetId;
let vehicle;
const repository = new InMemoryFleetRepository();

Given("my fleet", function () {
  const handler = new InitializeFleetHandler(repository);
  fleetId = handler.handle(new InitializeFleet());
});

Given("a vehicle", function () {
  vehicle = Vehicle.create("Car");
});

When("I register this vehicle into my fleet", function () {
  const registerCommand = new RegisterVehicle(fleetId, vehicle);
  const handler = new RegisterVehicleHandler(repository);
  handler.handle(registerCommand);
});

Then("this vehicle should be part of my vehicle fleet", function () {
  throw new Error("Not implemented");
});
