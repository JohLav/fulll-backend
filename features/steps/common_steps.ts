// First group: Testing
import { Before, Given } from "@cucumber/cucumber";
import { World } from "cucumber";
import { registerVehicleInUserFleet } from "./register_vehicle_steps";

// Second group: Domain
import { User } from "../../src/Domain/Models/User";
import { Vehicle } from "../../src/Domain/Models/Vehicle";

// Third group: App
import {
  InitializeFleet,
  InitializeFleetHandler,
} from "../../src/App/Commands/initializeFleet";

// Fourth group: Infra
import { InMemoryFleetRepository } from "../../src/Infra/Secondary/Repositories/InMemoryFleetRepository";

Before(function (): void {
  this.context = {};
});

Given("my fleet", async function (): Promise<void> {
  this.context.repository = new InMemoryFleetRepository();
  await initializeUser(this.context);
  await initializeFleetForUser(this.context);
});

Given("a vehicle", async function (): Promise<void> {
  await initializeVehicle(this.context);
});

Given(
  "I have registered this vehicle into my fleet",
  async function (): Promise<void> {
    await registerVehicleInUserFleet(this.context);
  },
);

async function initializeUser(context: World): Promise<void> {
  context.user = User.create(crypto.randomUUID());
}

export async function initializeFleetForUser(context: World): Promise<void> {
  const initializeFleet = new InitializeFleet(context.user.id);
  const handler = new InitializeFleetHandler(context.repository);
  context.fleetId = await handler.handle(initializeFleet);
}

async function initializeVehicle(context: World): Promise<void> {
  context.vehicle = Vehicle.create(generateFrenchPlateNumber());
}

function generateFrenchPlateNumber(): string {
  const letters = () =>
    String.fromCharCode(65 + Math.floor(Math.random() * 26));
  const digits = () => Math.floor(100 + Math.random() * 900); // 3 digits from 100 to 999
  return `${letters()}${letters()}-${digits()}-${letters()}${letters()}`;
}
