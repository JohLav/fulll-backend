import { FleetRepository } from "../../Domain/Repositories/FleetRepository.js";
import { Command, CommandHandler } from "./command.js";
import { Vehicle } from "../../Domain/Vehicle";

export class RegisterVehicle implements Command {
  constructor(
    public fleetId: string,
    public vehicle: Vehicle,
  ) {}
}

export class RegisterVehicleHandler implements CommandHandler {
  constructor(private repository: FleetRepository) {}

  handle(command: RegisterVehicle) {
    const fleet = this.repository.findById(command.fleetId);

    fleet.registerVehicle(command.vehicle);
    this.repository.save(fleet);
  }
}
