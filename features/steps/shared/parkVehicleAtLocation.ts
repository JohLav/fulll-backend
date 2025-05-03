import { Location } from "../../../src/Domain/Models/Location.js";
import { Vehicle } from "../../../src/Domain/Models/Vehicle.js";
import { FleetRepository } from "../../../src/Domain/Repositories/FleetRepository.js";
import {
  ParkVehicle,
  ParkVehicleHandler,
} from "../../../src/App/Commands/parkVehicle.js";

export function parkVehicleAtLocation(
  repository: FleetRepository,
  fleetId: string,
  vehicle: Vehicle,
  location: Location,
) {
  const parkVehicleCommand = new ParkVehicle(fleetId, vehicle, location);
  const handler = new ParkVehicleHandler(repository);
  handler.handle(parkVehicleCommand);
}
