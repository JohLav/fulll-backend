import { FleetRepository } from "../../../src/Domain/Ports/FleetRepository";
import {
  InitializeFleet,
  InitializeFleetHandler,
} from "../../../src/App/Commands/initializeFleet";
import { User } from "../../../src/Domain/Models/User";

export async function initializeFleetForUser(
  repository: FleetRepository,
  user: User,
): Promise<string> {
  const initializeFleet = new InitializeFleet(user.id);
  const handler = new InitializeFleetHandler(repository);
  return await handler.handle(initializeFleet);
}
