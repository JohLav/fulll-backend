import { CommandModule } from "yargs";
import { Vehicle } from "../Domain/Models/Vehicle.js";
import { VehicleType } from "../Domain/Types/VehicleType.js";
import { InMemoryFleetRepository } from "../Infra/Repositories/InMemoryFleetRepository.js";
import { generateFrenchPlateNumber } from "../Utils/generateFrenchPlateNumber.js";
import { registerVehicleInFleet } from "../../features/steps/shared/registerVehicleInFleet.js";
import { initializeFleetForUser } from "../../features/steps/shared/initializeFleetForUser.js";
import { User } from "../Domain/Models/User.js";

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
  handler: (argv) => {
    const { fleetId, vehiclePlateNumber, vehicleType } = argv;

    const repository = new InMemoryFleetRepository();

    const fleet = repository.findById(fleetId as string);
    if (!fleet) {
      console.error(`Fleet with ID "${fleetId}" not found.`);
    }

    try {
      const plateNumber = vehiclePlateNumber || generateFrenchPlateNumber();
      const vehicle = Vehicle.create(
        plateNumber as string,
        vehicleType as VehicleType,
      );
      registerVehicleInFleet(
        repository,
        fleetId as string,
        "some-user",
        vehicle,
      );
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
