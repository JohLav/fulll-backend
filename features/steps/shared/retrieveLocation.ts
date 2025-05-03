import { Location } from "../../../src/Domain/Models/Location.js";
import { FleetRepository } from "../../../src/Domain/Repositories/FleetRepository.js";
import {
  GetLocation,
  GetLocationHandler,
} from "../../../src/App/Queries/getLocation.js";

export function retrieveLocation(
  repository: FleetRepository,
  fleetId: string,
  vehiclePlateNumber: string,
): Location {
  const getLocationQuery = new GetLocation(fleetId, vehiclePlateNumber);
  const handler = new GetLocationHandler(repository);
  return handler.handle(getLocationQuery);
}
