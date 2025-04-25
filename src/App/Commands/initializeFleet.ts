import { Fleet } from "../../Domain/Fleet.js";
import { FleetRepository } from "../../Domain/Repositories/FleetRepository.js";

interface Command {}

interface CommandHandler {
  handle(command: Command): void;
}

export class InitializeFleet implements Command {}

export class InitializeFleetHandler implements CommandHandler {
  constructor(private repository: FleetRepository) {}

  handle(command: InitializeFleet) {
    const fleet = Fleet.initializeWithVehicles("fleet-001");
    this.repository.save(fleet);
  }
}
