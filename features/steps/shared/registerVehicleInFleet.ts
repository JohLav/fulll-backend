import { FleetRepository } from "../../../src/Domain/Repositories/FleetRepository.js";
import { Vehicle } from "../../../src/Domain/Models/Vehicle.js";
import {
  RegisterVehicle,
  RegisterVehicleHandler,
} from "../../../src/App/Commands/registerVehicle.js";

export function registerVehicleInFleet(
  repository: FleetRepository,
  fleetId: string,
  userId: string,
  vehicle: Vehicle,
): void {
  const registerVehicleCommand = new RegisterVehicle(fleetId, userId, vehicle);
  const handler = new RegisterVehicleHandler(repository);
  handler.handle(registerVehicleCommand);
}
