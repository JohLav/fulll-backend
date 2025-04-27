import { Location } from "../../Domain/Models/Location.js";
import { Vehicle } from "../../Domain/Models/Vehicle.js";
import { VehicleRepository } from "../../Domain/Repositories/VehicleRepository.js";
import { Command, CommandHandler } from "./command.js";

export class ParkVehicle implements Command {
  constructor(
    public vehicle: Vehicle,
    public location: Location,
  ) {}
}

export class ParkVehicleHandler implements CommandHandler {
  constructor(private repository: VehicleRepository) {}

  handle(command: ParkVehicle): void {
    const vehicle: Vehicle = this.repository.findById(command.vehicle.id);
    vehicle.parkVehicle(command.location);
    this.repository.save(vehicle);
  }
}
