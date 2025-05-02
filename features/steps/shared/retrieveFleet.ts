import { Fleet } from "../../../src/Domain/Models/Fleet.js";
import { FleetRepository } from "../../../src/Domain/Repositories/FleetRepository.js";
import {
  GetFleet,
  GetFleetHandler,
} from "../../../src/App/Queries/getFleet.js";

export function retrieveFleet(
  fleetRepository: FleetRepository,
  fleetId: string,
): Fleet {
  const getFleetQuery = new GetFleet(fleetId);
  const handler = new GetFleetHandler(fleetRepository);
  return handler.handle(getFleetQuery);
}
