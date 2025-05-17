import { CommandModule } from "yargs";
import { Location } from "../../Domain/Models/Location.js";
import { PrismaFleetRepository } from "../../Secondary/Repositories/PrismaFleetRepository.js";
import {
  ParkVehicle,
  ParkVehicleHandler,
} from "../../App/Commands/parkVehicle.js";

export const updateLocationCommand: CommandModule = {
  command: "update-location <fleetId> <vehiclePlateNumber> <lat> <lng> [alt]",
  describe: "Update vehicle's GPS location in a fleet",
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
      .positional("lat", {
        type: "number",
        describe: "Latitude of the vehicle's location",
      })
      .positional("lng", {
        type: "number",
        describe: "Longitude of the vehicle's location",
      })
      .positional("alt", {
        type: "number",
        describe: "Altitude (optional)",
        default: 0,
      });
  },
  handler: async (argv) => {
    const { fleetId, vehiclePlateNumber, lat, lng, alt } = argv;

    const repository = new PrismaFleetRepository();

    const location = Location.create(
      lat as number,
      lng as number,
      alt as number,
    );

    try {
      const parkVehicleCommand = new ParkVehicle(
        fleetId as string,
        vehiclePlateNumber as string,
        location,
      );
      const handler = new ParkVehicleHandler(repository);
      await handler.handle(parkVehicleCommand);
      console.log(
        `Updated vehicle with plate number ${vehiclePlateNumber} from fleet ID ${fleetId} to (latitude: ${lat}, longitude: ${lng}, altitude: ${alt})`,
      );
    } catch (error) {
      console.log(error);
    }
  },
};
