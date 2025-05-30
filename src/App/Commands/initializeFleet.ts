import { Command, CommandHandler } from "./command";
import { Fleet } from "../../Domain/Models/Fleet";
import { FleetRepository } from "../../Domain/Ports/FleetRepository";

export class InitializeFleet implements Command {
  constructor(public readonly userId: string) {}
}

export class InitializeFleetHandler implements CommandHandler {
  constructor(private repository: FleetRepository) {}

  async handle(command: InitializeFleet): Promise<string> {
    const fleet = Fleet.create(crypto.randomUUID(), command.userId, []);
    await this.repository.save(fleet);
    return fleet.id;
  }
}
