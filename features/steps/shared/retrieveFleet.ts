import { Fleet } from "../../../src/Domain/Models/Fleet.js";
import { FleetRepository } from "../../../src/Domain/Repositories/FleetRepository.js";
import {
  GetFleet,
  GetFleetHandler,
} from "../../../src/App/Queries/getFleet.js";

export async function retrieveFleet(
  repository: FleetRepository,
  fleetId: string,
): Promise<Fleet | undefined> {
  const getFleetQuery = new GetFleet(fleetId);
  const handler = new GetFleetHandler(repository);
  return await handler.handle(getFleetQuery);
}
