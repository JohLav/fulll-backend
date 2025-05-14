import { CommandModule } from "yargs";
import { Vehicle } from "../../Domain/Models/Vehicle.js";
import { PrismaFleetRepository } from "../../Secondary/Repositories/PrismaFleetRepository.js";
import {
  RegisterVehicle,
  RegisterVehicleHandler,
} from "../../App/Commands/registerVehicle.js";

export const registerVehicleCommand: CommandModule = {
  command: "register-vehicle <fleetId> <vehiclePlateNumber> <vehicleType>",
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

    const fleet = await repository.findById(fleetId as string);
    if (!fleet) {
      console.error(`Fleet with ID "${fleetId}" not found.`);
    }

    try {
      const id = crypto.randomUUID(); // Move to Domain to generate unique ID
      const vehicle = Vehicle.create(
        id as string,
        vehiclePlateNumber as string,
      );
      const registerVehicleCommand1 = new RegisterVehicle(
        fleetId as string,
        "some-user",
        vehicle,
      );
      const handler = new RegisterVehicleHandler(repository);
      await handler.handle(registerVehicleCommand1);
      console.log(
        `Vehicle with plate number ${vehiclePlateNumber} is registered in fleet ${fleetId}.`,
      );
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
      } else console.error("Unknown error occurred: ", error);
    }
  },
};
