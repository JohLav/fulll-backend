import { FleetRepository } from "../../../src/Domain/Repositories/FleetRepository.js";
import { Fleet } from "../../../src/Domain/Models/Fleet.js";
import {
  GetFleet,
  GetFleetHandler,
} from "../../../src/App/Queries/getFleet.js";

export function retrieveFleet(
  repository: FleetRepository,
  fleetId: string,
): Fleet {
  const getFleetQuery = new GetFleet(fleetId);
  const handler = new GetFleetHandler(repository);
  return handler.handle(getFleetQuery);
}
