// First group: Testing framework
import { Given, Then, When } from "@cucumber/cucumber";
import { World } from "cucumber";
import { expect } from "chai";

// Second group: Domain
import { User } from "../../src/Domain/Models/User";
import { Vehicle } from "../../src/Domain/Models/Vehicle";
import { VehicleAlreadyRegisteredError } from "../../src/Domain/Errors/VehicleAlreadyRegisteredError";

// Third group: App
import {
  RegisterVehicle,
  RegisterVehicleHandler,
} from "../../src/App/Commands/registerVehicle";

// Fourth group: Helpers
import { initializeFleetForUser } from "./shared/initializeFleetForUser";
import { retrieveFleet } from "./shared/retrieveFleet";

Given("the fleet of another user", async function (): Promise<void> {
  this.context.otherUser = User.create(crypto.randomUUID());
  this.context.otherFleetId = await initializeFleetForUser(
    this.context.repository,
    this.context.otherUser,
  );
});

Given(
  "this vehicle has been registered into the other user's fleet",
  async function (): Promise<void> {
    await registerVehicleInOtherUserFleet(this.context);
  },
);

When("I register this vehicle into my fleet", async function (): Promise<void> {
  await registerVehicleInUserFleet(this.context);
});

When(
  "I try to register this vehicle into my fleet",
  async function (): Promise<void> {
    try {
      await registerVehicleInUserFleet(this.context);

      this.context.registrationError = null;
    } catch (error) {
      this.context.registrationError = error;
    }
  },
);

Then(
  "this vehicle should be part of my vehicle fleet",
  async function (): Promise<void> {
    const fleet = await retrieveFleet(
      this.context.repository,
      this.context.fleetId,
    );

    const vehiclePlateNumber: string = fleet.vehicles
      .map((v: Vehicle): string => v.plateNumber)
      .toString();

    expect(vehiclePlateNumber).to.deep.include(
      this.context.vehicle.plateNumber,
    );
  },
);

Then(
  "I should be informed that this vehicle has already been registered into my fleet",
  function (): void {
    const expected = new VehicleAlreadyRegisteredError(
      this.context.vehicle.plateNumber,
    );

    expect(this.context.registrationError).to.deep.equal(expected);
  },
);

export async function registerVehicleInUserFleet(
  context: World,
): Promise<void> {
  const registerVehicleCommand = new RegisterVehicle(
    context.fleetId,
    context.user.id,
    context.vehicle.plateNumber,
  );
  const handler = new RegisterVehicleHandler(context.repository);
  await handler.handle(registerVehicleCommand);
}

async function registerVehicleInOtherUserFleet(context: World): Promise<void> {
  const registerVehicleCommand = new RegisterVehicle(
    context.otherFleetId,
    context.otherUser.id,
    context.vehicle.plateNumber,
  );
  const handler = new RegisterVehicleHandler(context.repository);
  await handler.handle(registerVehicleCommand);
}
