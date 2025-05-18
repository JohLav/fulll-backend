import { Given } from "@cucumber/cucumber";
import { User } from "../../src/Domain/Models/User";
import { Vehicle } from "../../src/Domain/Models/Vehicle";
import { InMemoryFleetRepository } from "../../src/Infra/Secondary/Repositories/InMemoryFleetRepository";
import { initializeFleetForUser } from "./shared/initializeFleetForUser";
import { registerVehicleInUserFleet } from "./register_vehicle_steps";
import { generateFrenchPlateNumber } from "../../tests/Utils/generateFrenchPlateNumber";

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
