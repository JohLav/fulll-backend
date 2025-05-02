import { Location } from "../../../src/Domain/Models/Location.js";
import { Vehicle } from "../../../src/Domain/Models/Vehicle.js";
import { VehicleRepository } from "../../../src/Domain/Repositories/VehicleRepository.js";
import {
  ParkVehicle,
  ParkVehicleHandler,
} from "../../../src/App/Commands/parkVehicle.js";

export function parkVehicleAtLocation(
  vehicleRepository: VehicleRepository,
  vehicle: Vehicle,
  location: Location,
) {
  const parkVehicleCommand = new ParkVehicle(vehicle, location);
  const handler = new ParkVehicleHandler(vehicleRepository);
  handler.handle(parkVehicleCommand);
}
