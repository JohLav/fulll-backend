import { Given } from "@cucumber/cucumber";
import { User } from "../../src/Domain/Models/User.js";
import { Vehicle } from "../../src/Domain/Models/Vehicle.js";
import { InMemoryFleetRepository } from "../../src/Secondary/Repositories/InMemoryFleetRepository.js";
import { initializeFleetForUser } from "./shared/initializeFleetForUser.js";
import { registerVehicleInUserFleet } from "./register_vehicle_steps.js";
import { generateFrenchPlateNumber } from "../../tests/Utils/generateFrenchPlateNumber.js";

Given("my fleet", async function (): Promise<void> {
  const user: User = User.create(crypto.randomUUID());
  this.context = { user, repository: new InMemoryFleetRepository() };
  this.context.fleetId = await initializeFleetForUser(
    this.context.repository,
    user,
  );
});

Given("a vehicle", async function (): Promise<void> {
  this.context.vehicle = Vehicle.create(generateFrenchPlateNumber());
});

Given(
  "I have registered this vehicle into my fleet",
  async function (): Promise<void> {
    await registerVehicleInUserFleet(this.context);
  },
);
