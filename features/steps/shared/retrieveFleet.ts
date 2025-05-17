import { Fleet } from "../../../src/Domain/Models/Fleet.js";
import { FleetRepository } from "../../../src/Domain/Ports/FleetRepository.js";
import {
  GetFleet,
  GetFleetHandler,
} from "../../../src/App/Queries/getFleet.js";

export async function retrieveFleet(
  repository: FleetRepository,
  fleetId: string,
): Promise<Fleet> {
  const getFleetQuery = new GetFleet(fleetId);
  const handler = new GetFleetHandler(repository);
  return await handler.handle(getFleetQuery);
}
