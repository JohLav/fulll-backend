import { Command, CommandHandler } from "./command.js";
import { Fleet } from "../../Domain/Models/Fleet.js";
import { FleetRepository } from "../../Domain/Repositories/FleetRepository.js";
import { generateRandomId } from "../../../tests/Utils/generateRandomId.js";

export class InitializeFleet implements Command {
  constructor(public readonly userId: string) {}
}

export class InitializeFleetHandler implements CommandHandler {
  constructor(private repository: FleetRepository) {}

  async handle(command: InitializeFleet): Promise<string> {
    const fleet = Fleet.create(generateRandomId(), command.userId, []);
    await this.repository.save(fleet);
    return fleet.id;
  }
}
