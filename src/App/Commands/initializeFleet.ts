import { Fleet } from "../../Domain/Models/Fleet.js";
import { FleetRepository } from "../../Domain/Repositories/FleetRepository.js";
import { Command, CommandHandler } from "./command.js";

export class InitializeFleet implements Command {}

export class InitializeFleetHandler implements CommandHandler {
  constructor(private repository: FleetRepository) {}

  handle(command: InitializeFleet): string {
    const fleet = Fleet.initializeFleet();
    this.repository.save(fleet);
    return fleet.id;
  }
}
