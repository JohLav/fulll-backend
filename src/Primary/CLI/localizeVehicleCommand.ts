import { CommandModule } from "yargs";
import { PrismaFleetRepository } from "../../Secondary/Repositories/PrismaFleetRepository.js";
import {
  GetLocation,
  GetLocationHandler,
} from "../../App/Queries/getLocation.js";

export const localizeVehicleCommand: CommandModule = {
  command: "localize-vehicle <fleetId> <vehiclePlateNumber>",
  describe: "Retrieve the GPS position of a vehicle in a fleet",
  builder: (yargs) => {
    return yargs
      .positional("fleetId", {
        type: "string",
        describe: "ID of the fleet",
      })
      .positional("vehiclePlateNumber", {
        type: "string",
        describe: "Plate number of the vehicle",
      });
  },
  handler: async (argv) => {
    const { fleetId, vehiclePlateNumber } = argv;

    const repository = new PrismaFleetRepository();

    try {
      const getLocationQuery = new GetLocation(
        fleetId as string,
        vehiclePlateNumber as string,
      );
      const handler = new GetLocationHandler(repository);
      const location = await handler.handle(getLocationQuery);

      console.log(
        `Localizing vehicle with plate number ${vehiclePlateNumber} from fleet ID ${fleetId} to (${location.latitude}, ${location.longitude})`,
      );
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
      } else console.error("Unknown error occurred: ", error);
    }
  },
};
