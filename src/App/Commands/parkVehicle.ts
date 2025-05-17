import { Command, CommandHandler } from "./command.js";
import { Location } from "../../Domain/Models/Location.js";
import { FleetNotFoundError } from "../../Domain/Errors/FleetNotFoundError.js";
import { FleetRepository } from "../../Domain/Ports/FleetRepository.js";

export class ParkVehicle implements Command {
  constructor(
    public readonly fleetId: string,
    public readonly vehiclePlateNumber: string,
    public readonly location: Location,
  ) {}
}

export class ParkVehicleHandler implements CommandHandler {
  constructor(private readonly repository: FleetRepository) {}

  async handle(command: ParkVehicle): Promise<void> {
    const fleet = await this.repository.findById(command.fleetId);
    if (!fleet) throw new FleetNotFoundError(command.fleetId);

    fleet.parkVehicle(command.vehiclePlateNumber, command.location);

    await this.repository.save(fleet);
  }
}
