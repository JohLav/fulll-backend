import { Command, CommandHandler } from "./command.js";
import { Fleet } from "../../Domain/Models/Fleet.js";
import { FleetRepository } from "../../Domain/Repositories/FleetRepository.js";

export class InitializeFleet implements Command {
  constructor(public readonly userId: string) {}
}

export class InitializeFleetHandler implements CommandHandler {
  constructor(private repository: FleetRepository) {}

  handle(command: InitializeFleet): string {
    const fleet = Fleet.initializeFleet(command.userId);
    this.repository.save(fleet);
    return fleet.id;
  }
}
