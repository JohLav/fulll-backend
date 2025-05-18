import { Location } from "../../../src/Domain/Models/Location";
import { FleetRepository } from "../../../src/Domain/Ports/FleetRepository";
import {
  ParkVehicle,
  ParkVehicleHandler,
} from "../../../src/App/Commands/parkVehicle";

export async function parkVehicleAtLocation(
  repository: FleetRepository,
  fleetId: string,
  vehiclePlateNumber: string,
  location: Location,
): Promise<void> {
  const parkVehicleCommand = new ParkVehicle(
    fleetId,
    vehiclePlateNumber,
    location,
  );
  const handler = new ParkVehicleHandler(repository);
  await handler.handle(parkVehicleCommand);
}
