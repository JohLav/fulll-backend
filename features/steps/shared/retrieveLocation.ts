import { Location } from "../../../src/Domain/Models/Location.js";
import { FleetRepository } from "../../../src/Domain/Ports/FleetRepository.js";
import {
  GetLocation,
  GetLocationHandler,
} from "../../../src/App/Queries/getLocation.js";

export async function retrieveLocation(
  repository: FleetRepository,
  fleetId: string,
  vehiclePlateNumber: string,
): Promise<Location> {
  const getLocationQuery = new GetLocation(fleetId, vehiclePlateNumber);
  const handler = new GetLocationHandler(repository);
  return await handler.handle(getLocationQuery);
}
