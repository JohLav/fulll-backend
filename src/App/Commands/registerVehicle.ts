import { Vehicle } from "../../Domain/Models/Vehicle.js";
import { FleetNotFoundError } from "../Errors/FleetNotFoundError.js";
import { FleetRepository } from "../../Domain/Repositories/FleetRepository.js";
import { Command, CommandHandler } from "./command.js";

export class RegisterVehicle implements Command {
  constructor(
    public fleetId: string,
    public userId: string,
    public vehicle: Vehicle,
  ) {}
}

export class RegisterVehicleHandler implements CommandHandler {
  constructor(private fleetRepository: FleetRepository) {}

  handle(command: RegisterVehicle): void {
    const fleet = this.fleetRepository.findById(command.fleetId);

    if (!fleet) throw new FleetNotFoundError(command.fleetId);

    fleet.registerVehicle(command.vehicle);

    this.fleetRepository.save(fleet);
  }
}
