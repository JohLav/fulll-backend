import { FleetRepository } from "../../../src/Domain/Repositories/FleetRepository.js";
import { User } from "../../../src/Domain/Models/User.js";
import {
  InitializeFleet,
  InitializeFleetHandler,
} from "../../../src/App/Commands/initializeFleet.js";

export async function initializeFleetForUser(
  repository: FleetRepository,
  user: User,
): Promise<string> {
  const initializeFleet = new InitializeFleet(user.id);
  const handler = new InitializeFleetHandler(repository);
  return await handler.handle(initializeFleet);
}
