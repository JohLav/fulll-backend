import { Fleet } from "../../Domain/Models/Fleet.js";
import { FleetRepository } from "../../Domain/Repositories/FleetRepository.js";
import { Vehicle } from "../../Domain/Models/Vehicle.js";
import { Command, CommandHandler } from "./command";

export class RegisterVehicle implements Command {
  constructor(
    public fleetId: string,
    public userId: string,
    public vehicle: Vehicle,
  ) {}
}

export class RegisterVehicleHandler implements CommandHandler {
  constructor(private repository: FleetRepository) {}

  handle(command: RegisterVehicle): void {
    const fleet: Fleet = this.repository.findById(command.fleetId);
    fleet.registerVehicle(command.vehicle);
    this.repository.save(fleet);
  }
}
