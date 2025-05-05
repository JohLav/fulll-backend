import { Command, CommandHandler } from "./command.js";
import { Location } from "../../Domain/Models/Location.js";
import { Vehicle } from "../../Domain/Models/Vehicle.js";
import { FleetRepository } from "../../Domain/Repositories/FleetRepository.js";
import { FleetNotFoundError } from "../Errors/FleetNotFoundError.js";
import { VehiclePlateNotFoundError } from "../Errors/VehiclePlateNotFoundError.js";

export class ParkVehicle implements Command {
  constructor(
    public readonly fleetId: string,
    public vehicle: Vehicle,
    public location: Location,
  ) {}
}

export class ParkVehicleHandler implements CommandHandler {
  constructor(private repository: FleetRepository) {}

  async handle(command: ParkVehicle): Promise<void> {
    const fleet = await this.repository.findById(command.fleetId);
    if (!fleet) throw new FleetNotFoundError(command.fleetId);

    const vehicle = fleet.findVehicleByPlateNumber(command.vehicle.plateNumber);
    if (!vehicle)
      throw new VehiclePlateNotFoundError(command.vehicle.plateNumber);

    vehicle.parkVehicle(command.location);

    await this.repository.save(fleet);
  }
}
