import { CommandModule } from "yargs";
import { Location } from "../../Domain/Models/Location.js";
import { PrismaFleetRepository } from "../../Secondary/Repositories/PrismaFleetRepository.js";
import {
  ParkVehicle,
  ParkVehicleHandler,
} from "../../App/Commands/parkVehicle.js";

export const updateLocationCommand: CommandModule = {
  command:
    "update-location <fleetId> <vehiclePlateNumber> <latitude> <longitude> [altitude]",
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

    const vehicle = await repository.findVehicleByPlateNumber(
      fleetId as string,
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
      const parkVehicleCommand = new ParkVehicle(
        fleetId as string,
        vehicle,
        location,
      );
      const handler = new ParkVehicleHandler(repository);
      await handler.handle(parkVehicleCommand);
      console.log(
        `Updated vehicle with plate number ${vehiclePlateNumber} from fleet ID ${fleetId} to (latitude: ${latitude}, longitude: ${longitude}, altitude: ${location.altitude})`,
      );
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
      } else console.error("Unknown error occurred: ", error);
    }
  },
};
