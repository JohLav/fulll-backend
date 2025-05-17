import { CommandModule } from "yargs";
import { PrismaFleetRepository } from "../../Secondary/Repositories/PrismaFleetRepository.js";
import {
  RegisterVehicle,
  RegisterVehicleHandler,
} from "../../App/Commands/registerVehicle.js";

export const registerVehicleCommand: CommandModule = {
  command: "register-vehicle <fleetId> <vehiclePlateNumber>",
  describe: "Register a vehicle in a fleet",
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
      const registerVehicleCommand = new RegisterVehicle(
        fleetId as string,
        "some-user",
        vehiclePlateNumber as string,
      );
      const handler = new RegisterVehicleHandler(repository);
      await handler.handle(registerVehicleCommand);
      console.log(
        `Vehicle with plate number ${vehiclePlateNumber} is registered in fleet ${fleetId}.`,
      );
    } catch (error) {
      console.log(error);
    }
  },
};
