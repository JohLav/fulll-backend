import { Location } from "../../../src/Domain/Models/Location.js";
import { Vehicle } from "../../../src/Domain/Models/Vehicle.js";
import { FleetRepository } from "../../../src/Domain/Repositories/FleetRepository.js";
import {
  ParkVehicle,
  ParkVehicleHandler,
} from "../../../src/App/Commands/parkVehicle.js";

export async function parkVehicleAtLocation(
  repository: FleetRepository,
  fleetId: string,
  vehicle: Vehicle,
  location: Location,
): Promise<void> {
  const parkVehicleCommand = new ParkVehicle(fleetId, vehicle, location);
  const handler = new ParkVehicleHandler(repository);
  await handler.handle(parkVehicleCommand);
}
