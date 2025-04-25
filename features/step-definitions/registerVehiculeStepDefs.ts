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
import { Fleet } from "../../src/Domain/Fleet.js";
import { GetFleet, GetFleetHandler } from "../../src/App/Queries/getFleet.js";
import { expect } from "expect";

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
  const getFleetQuery = new GetFleet(fleetId);
  const handler = new GetFleetHandler(repository);
  const fleet: Fleet = handler.handle(getFleetQuery);

  expect(fleet.id).toBe(fleetId);
  expect(fleet.vehicles).toEqual(
    expect.arrayContaining([expect.objectContaining(vehicle)]),
  );
});
