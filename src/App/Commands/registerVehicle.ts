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
    const getFleetQuery = new GetFleet(command.fleetId);
    const getFleetHandler = new GetFleetHandler(this.fleetRepository);
    const fleet = getFleetHandler.handle(getFleetQuery);
    this.fleetRepository.save(fleet);
  }
}
