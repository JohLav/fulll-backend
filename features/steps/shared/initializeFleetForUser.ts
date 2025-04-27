import { FleetRepository } from "../../../src/Domain/Repositories/FleetRepository.js";
import { User } from "../../../src/Domain/Models/User.js";
import {
  InitializeFleet,
  InitializeFleetHandler,
} from "../../../src/App/Commands/initializeFleet.js";

export function initializeFleetForUser(
  repository: FleetRepository,
  user: User,
) {
  const initializeFleet = new InitializeFleet(user.id);
  const handler = new InitializeFleetHandler(repository);
  return handler.handle(initializeFleet);
}
