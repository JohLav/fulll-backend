import { Fleet } from "../../../src/Domain/Models/Fleet";
import { FleetRepository } from "../../../src/Domain/Ports/FleetRepository";
import { GetFleet, GetFleetHandler } from "../../../src/App/Queries/getFleet";

export async function retrieveFleet(
  repository: FleetRepository,
  fleetId: string,
): Promise<Fleet> {
  const getFleetQuery = new GetFleet(fleetId);
  const handler = new GetFleetHandler(repository);
  return await handler.handle(getFleetQuery);
}
