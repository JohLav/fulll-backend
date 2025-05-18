import { Location } from "../../../src/Domain/Models/Location";
import { FleetRepository } from "../../../src/Domain/Ports/FleetRepository";
import {
  GetLocation,
  GetLocationHandler,
} from "../../../src/App/Queries/getLocation";

export async function retrieveLocation(
  repository: FleetRepository,
  fleetId: string,
  vehiclePlateNumber: string,
): Promise<Location> {
  const getLocationQuery = new GetLocation(fleetId, vehiclePlateNumber);
  const handler = new GetLocationHandler(repository);
  return await handler.handle(getLocationQuery);
}
