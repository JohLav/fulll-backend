import { Command, CommandHandler } from "./command.js";
import { FleetNotFoundError } from "../../Domain/Errors/FleetNotFoundError.js";
import { FleetRepository } from "../../Domain/Ports/FleetRepository.js";

export class RegisterVehicle implements Command {
  constructor(
    public fleetId: string,
    public userId: string,
    public vehiclePlateNumber: string,
  ) {}
}

export class RegisterVehicleHandler implements CommandHandler {
  constructor(private repository: FleetRepository) {}

  async handle(command: RegisterVehicle): Promise<void> {
    const fleet = await this.repository.findById(command.fleetId);
    if (!fleet) throw new FleetNotFoundError(command.fleetId);

    fleet.registerVehicle(command.vehiclePlateNumber);

    await this.repository.save(fleet);
  }
}
