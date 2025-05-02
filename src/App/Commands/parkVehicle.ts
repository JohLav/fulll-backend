import { Location } from "../../Domain/Models/Location.js";
import { Vehicle } from "../../Domain/Models/Vehicle.js";
import { VehicleNotFoundError } from "../Errors/VehicleNotFoundError.js";
import { VehicleRepository } from "../../Domain/Repositories/VehicleRepository.js";
import { Command, CommandHandler } from "./command.js";

export class ParkVehicle implements Command {
  constructor(
    public vehicle: Vehicle,
    public location: Location,
  ) {}
}

/**
 * Does not handle the case where vehicle is not in a fleet
 * TODO: Ask PO if this could happen and how it should be handled
 */
export class ParkVehicleHandler implements CommandHandler {
  constructor(private repository: VehicleRepository) {}

  handle(command: ParkVehicle): void {
    const vehicle = this.repository.findById(command.vehicle.id);

    if (!vehicle) throw new VehicleNotFoundError(command.vehicle.id);

    vehicle.parkVehicle(command.location);

    this.repository.save(vehicle);
  }
}
