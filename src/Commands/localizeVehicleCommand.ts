import { CommandModule } from "yargs";
import { Location } from "../Domain/Models/Location.js";
import { parkVehicleAtLocation } from "../../features/steps/shared/parkVehicleAtLocation.js";
import { InMemoryVehicleRepository } from "../Infra/Repositories/InMemoryVehicleRepository.js";

export const localizeVehicleCommand: CommandModule = {
  command:
    "localize-vehicle <fleetId> <vehiclePlateNumber> <latitude> <longitude> [alt]",
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
      .positional("alt", {
        type: "number",
        describe: "Altitude (optional)",
        default: 0,
      });
  },
  handler: (argv) => {
    const { fleetId, vehiclePlateNumber, latitude, longitude, alt } = argv;

    const vehicleRepository = new InMemoryVehicleRepository();

    const location = Location.create(
      latitude as number,
      longitude as number,
      alt as number,
    );
    const vehicle = vehicleRepository.findByPlateNumber(
      vehiclePlateNumber as string,
    );

    try {
      parkVehicleAtLocation(vehicleRepository, vehicle, location);
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
