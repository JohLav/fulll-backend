import { Given } from "@cucumber/cucumber";
import { User } from "../../src/Domain/Models/User.js";
import { Vehicle } from "../../src/Domain/Models/Vehicle.js";
import { VehicleType } from "../../src/Domain/Types/VehicleType.js";
import { InMemoryFleetRepository } from "../../src/Infra/Repositories/InMemoryFleetRepository.js";
import { generateFrenchPlateNumber } from "../../src/Utils/generateFrenchPlateNumber.js";
import { initializeFleetForUser } from "./shared/initializeFleetForUser.js";
import { registerVehicleInFleet } from "./shared/registerVehicleInFleet.js";

Given("my fleet", function (): void {
  const user: User = User.create(crypto.randomUUID());
  this.context = { user, repository: new InMemoryFleetRepository() };
  this.context.fleetId = initializeFleetForUser(this.context.repository, user);
});

Given("a vehicle", function (): void {
  const plateNumber = generateFrenchPlateNumber();
  this.context.vehicle = Vehicle.create(plateNumber, VehicleType.CAR);
});

Given("I have registered this vehicle into my fleet", function () {
  registerVehicleInFleet(
    this.context.repository,
    this.context.fleetId,
    this.context.user.id,
    this.context.vehicle,
  );
});
