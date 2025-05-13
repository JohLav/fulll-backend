import { CommandModule } from "yargs";
import { Vehicle } from "../Domain/Models/Vehicle.js";
import { VehicleType } from "../Domain/Types/VehicleType.js";
import { generateFrenchPlateNumber } from "../Utils/generateFrenchPlateNumber.js";
import { PrismaFleetRepository } from "../Infra/Repositories/PrismaFleetRepository.js";
import {
  RegisterVehicle,
  RegisterVehicleHandler,
} from "../App/Commands/registerVehicle";

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
      })
      .positional("vehicleType", {
        type: "string",
        describe: "Vehicle type (e.g., CAR, MOTORCYCLE, TRUCK)",
        choices: Object.keys(VehicleType),
      }),
  handler: async (argv) => {
    const { fleetId, vehiclePlateNumber, vehicleType } = argv;

    const repository = new PrismaFleetRepository();

    const fleet = await repository.findById(fleetId as string);
    if (!fleet) {
      console.error(`Fleet with ID "${fleetId}" not found.`);
    }

    try {
      const id = crypto.randomUUID();
      const plateNumber = vehiclePlateNumber || generateFrenchPlateNumber();
      const vehicle = Vehicle.create(
        id as string,
        plateNumber as string,
        vehicleType as VehicleType,
      );
      const registerVehicleCommand1 = new RegisterVehicle(
        fleetId as string,
        "some-user",
        vehicle,
      );
      const handler = new RegisterVehicleHandler(repository);
      await handler.handle(registerVehicleCommand1);
      console.log(
        `${vehicleType} with plate number ${vehiclePlateNumber} is registered in fleet ${fleetId}.`,
      );
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
      } else console.error("Unknown error occurred: ", error);
    }
  },
};
