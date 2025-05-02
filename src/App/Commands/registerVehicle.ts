import { FleetRepository } from "../../Domain/Repositories/FleetRepository.js";
import { Vehicle } from "../../Domain/Models/Vehicle.js";
import { Command, CommandHandler } from "./command.js";
import { GetFleet, GetFleetHandler } from "../Queries/getFleet.js";

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
    // TODO: Change Query to findById (repository)
    const getFleetQuery = new GetFleet(command.fleetId);
    const getFleetHandler = new GetFleetHandler(this.fleetRepository);
    const fleet = getFleetHandler.handle(getFleetQuery);

    fleet.registerVehicle(command.vehicle);

    this.fleetRepository.save(fleet);
  }
}
