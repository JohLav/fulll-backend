import { Command, CommandHandler } from "./command";
import { Location } from "../../Domain/Models/Location.js";
import { FleetRepository } from "../../Domain/Repositories/FleetRepository.js";
import { FleetNotFoundError } from "../Errors/FleetNotFoundError.js";

export class LocalizeVehicle implements Command {
  constructor(
    public readonly fleetId: string,
    public readonly vehiclePlateNumber: string,
    public readonly latitude: number,
    public readonly longitude: number,
    public readonly altitude: number = 0,
  ) {}
}

export class LocalizeVehicleHandler implements CommandHandler {
  constructor(private repository: FleetRepository) {}

  async handle(command: LocalizeVehicle): Promise<void> {
    const fleet = await this.repository.findById(command.fleetId);
    if (!fleet) throw new FleetNotFoundError(command.fleetId);

    const location = Location.create(
      command.latitude,
      command.longitude,
      command.altitude,
    );

    fleet.localizeVehicle(command.vehiclePlateNumber, location);

    await this.repository.save(fleet);
  }
}
