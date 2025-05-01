import { Given } from "@cucumber/cucumber";
import { User } from "../../src/Domain/Models/User.js";
import { Vehicle } from "../../src/Domain/Models/Vehicle.js";
import { VehicleType } from "../../src/Domain/Types/VehicleType.js";
import { InMemoryFleetRepository } from "../../src/Infra/InMemoryFleetRepository.js";
import { initializeFleetForUser } from "./shared/initializeFleetForUser.js";
import { registerVehicleInFleet } from "./shared/registerVehicleInFleet.js";

Given("my fleet", function (): void {
  const user: User = User.create();
  this.context = { user, fleetRepository: new InMemoryFleetRepository() };
  this.context.fleetId = initializeFleetForUser(
    this.context.fleetRepository,
    user,
  );
});

Given("a vehicle", function (): void {
  this.context.vehicle = Vehicle.create(VehicleType.CAR);
});

Given("I have registered this vehicle into my fleet", function () {
  registerVehicleInFleet(
    this.context.fleetRepository,
    this.context.fleetId,
    this.context.user.id,
    this.context.vehicle,
  );
});
