import { Fleet } from "../../Domain/Models/Fleet.js";
import { FleetRepository } from "../../Domain/Repositories/FleetRepository.js";
import { Vehicle } from "../../Domain/Models/Vehicle.js";
import { Command, CommandHandler } from "./command.js";
import { FleetNotFoundError } from "../Errors/FleetNotFoundError";

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
    const fleet = this.repository.findById(command.fleetId);
    if (!fleet) throw new FleetNotFoundError(command.fleetId);
    this.repository.save(fleet);
  }
}
