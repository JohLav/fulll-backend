import { Command, CommandHandler } from "./command.js";
import { Vehicle } from "../../Domain/Models/Vehicle.js";
import { FleetRepository } from "../../Domain/Repositories/FleetRepository.js";
import { FleetNotFoundError } from "../Errors/FleetNotFoundError.js";

export class RegisterVehicle implements Command {
  constructor(
    public fleetId: string,
    public userId: string,
    public vehicle: Vehicle,
  ) {}
}

export class RegisterVehicleHandler implements CommandHandler {
  constructor(private repository: FleetRepository) {}

  async handle(command: RegisterVehicle): Promise<void> {
    const fleet = await this.repository.findById(command.fleetId);
    if (!fleet) throw new FleetNotFoundError(command.fleetId);

    fleet.registerVehicle(command.vehicle);

    await this.repository.save(fleet);
  }
}
