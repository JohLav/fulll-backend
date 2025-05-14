import { CommandModule } from "yargs";
import { Vehicle } from "../../Domain/Models/Vehicle.js";
import { PrismaFleetRepository } from "../../Secondary/Repositories/PrismaFleetRepository.js";
import {
  RegisterVehicle,
  RegisterVehicleHandler,
} from "../../App/Commands/registerVehicle.js";
import { generateRandomId } from "../../../tests/Utils/generateRandomId.js"; // TODO: Move to Domain?

export const registerVehicleCommand: CommandModule = {
  command: "register-vehicle <fleetId> <vehiclePlateNumber>",
  describe: "Register a vehicle into a fleet",
  builder: (yargs) =>
    yargs
      .positional("fleetId", {
        type: "string",
        describe: "Fleet ID",
      })
      .positional("vehiclePlateNumber", {
        type: "string",
        describe: "Plate number of the vehicle",
      }),
  handler: async (argv) => {
    const { fleetId, vehiclePlateNumber } = argv;

    const repository = new PrismaFleetRepository();

    try {
      const randomId = generateRandomId(); // Move to Domain to generate unique ID
      const vehicle = Vehicle.create(
        randomId as string,
        vehiclePlateNumber as string,
      );
      const registerVehicleCommand = new RegisterVehicle(
        fleetId as string,
        "some-user",
        vehicle,
      );
      const handler = new RegisterVehicleHandler(repository);
      await handler.handle(registerVehicleCommand);
      console.log(
        `Vehicle with plate number ${vehiclePlateNumber} is registered in fleet ${fleetId}.`,
      );
    } catch (error) {
      if (error instanceof Error) console.error(error.message);
      else console.error("Unknown error occurred: ", error);
    }
  },
};
