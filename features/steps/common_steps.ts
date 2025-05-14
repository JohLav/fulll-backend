import { Given } from "@cucumber/cucumber";
import { User } from "../../src/Domain/Models/User.js";
import { Vehicle } from "../../src/Domain/Models/Vehicle.js";
import { VehicleType } from "../../src/Domain/Types/VehicleType.js";
import { InMemoryFleetRepository } from "../../src/Secondary/Repositories/InMemoryFleetRepository.js";
import { generateFrenchPlateNumber } from "../../tests/Utils/generateFrenchPlateNumber.js";
import { initializeFleetForUser } from "./shared/initializeFleetForUser.js";
import { registerVehicle } from "./register_vehicle_steps.js";

Given("my fleet", async function (): Promise<void> {
  const user: User = User.create(crypto.randomUUID());
  this.context = { user, repository: new InMemoryFleetRepository() };
  this.context.fleetId = await initializeFleetForUser(
    this.context.repository,
    user,
  );
});

Given("a vehicle", async function (): Promise<void> {
  const id = crypto.randomUUID();
  const plateNumber = generateFrenchPlateNumber();
  this.context.vehicle = Vehicle.create(id, plateNumber, VehicleType.CAR);
});

Given(
  "I have registered this vehicle into my fleet",
  async function (): Promise<void> {
    await registerVehicle(this.context);
  },
);
