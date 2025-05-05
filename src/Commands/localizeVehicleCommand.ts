import { CommandModule } from "yargs";
import { Location } from "../Domain/Models/Location.js";
import { PrismaFleetRepository } from "../Infra/Repositories/PrismaFleetRepository.js";
import { parkVehicleAtLocation } from "../../features/steps/shared/parkVehicleAtLocation.js";

export const localizeVehicleCommand: CommandModule = {
  command:
    "localize-vehicle <fleetId> <vehiclePlateNumber> <latitude> <longitude> [altitude]",
  describe: "Update the GPS position of a vehicle in a fleet",
  builder: (yargs) => {
    return yargs
      .positional("fleetId", {
        type: "string",
        describe: "ID of the fleet",
      })
      .positional("vehiclePlateNumber", {
        type: "string",
        describe: "Plate number of the vehicle",
      })
      .positional("latitude", {
        type: "number",
        describe: "Latitude of the vehicle's location",
      })
      .positional("longitude", {
        type: "number",
        describe: "Longitude of the vehicle's location",
      })
      .positional("altitude", {
        type: "number",
        describe: "Altitude (optional)",
        default: 0,
      });
  },
  handler: async (argv) => {
    const { fleetId, vehiclePlateNumber, latitude, longitude, altitude } = argv;

    const repository = new PrismaFleetRepository();

    const fleet = await repository.findById(fleetId as string);
    if (!fleet) {
      console.error(`Fleet with ID "${fleetId}" not found.`);
      return;
    }

    const vehicle = await repository.findVehicleByPlateNumber(
      fleet.id as string,
      vehiclePlateNumber as string,
    );
    if (!vehicle) {
      console.error(
        `Vehicle with plate number "${vehiclePlateNumber}" not found.`,
      );
      return;
    }

    const location = Location.create(
      latitude as number,
      longitude as number,
      altitude as number,
    );

    try {
      await parkVehicleAtLocation(
        repository,
        fleetId as string,
        vehicle,
        location,
      );
      console.log(
        `Localizing vehicle with plate number ${vehiclePlateNumber} from fleet ID ${fleetId} to (${latitude}, ${longitude})`,
      );
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
      } else console.error("Unknown error occurred: ", error);
    }
  },
};
