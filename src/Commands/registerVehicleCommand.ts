import { CommandModule } from "yargs";
import { Vehicle } from "../Domain/Models/Vehicle.js";
import { VehicleType } from "../Domain/Types/VehicleType.js";
import { InMemoryFleetRepository } from "../Infra/Repositories/InMemoryFleetRepository.js";
import { registerVehicleInFleet } from "../../features/steps/shared/registerVehicleInFleet.js";

// TODO: Implement VehiclePlateNumber
export const registerVehicleCommand: CommandModule = {
  command: "register-vehicle <fleetId> <vehicleType>",
  describe: "Register a vehicle into a fleet",
  builder: (yargs) =>
    yargs
      .positional("fleetId", {
        type: "string",
        describe: "Fleet ID",
      })
      .positional("vehicleType", {
        type: "string",
        describe: "Vehicle type (e.g., CAR, MOTORCYCLE, TRUCK)",
        choices: Object.keys(VehicleType),
      }),
  // .positional("vehiclePlateNumber", {
  //   type: "string",
  //   describe: "Plate number of the vehicle",
  // }),
  handler: (argv) => {
    const { fleetId, vehicleType } = argv;

    try {
      const fleetRepository = new InMemoryFleetRepository();
      const vehicle = Vehicle.create(vehicleType as VehicleType);
      registerVehicleInFleet(
        fleetRepository,
        fleetId as string,
        "some-user",
        vehicle,
      );
      console.log(
        `Vehicle with ID ${vehicle.id} registered in fleet ${fleetId}`,
      );
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
      } else console.error("Unknown error occurred: ", error);
    }
  },
};
