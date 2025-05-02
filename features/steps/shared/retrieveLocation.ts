import { Location } from "../../../src/Domain/Models/Location.js";
import { VehicleRepository } from "../../../src/Domain/Repositories/VehicleRepository.js";
import {
  GetLocation,
  GetLocationHandler,
} from "../../../src/App/Queries/getLocation.js";

export function retrieveLocation(
  vehicleRepository: VehicleRepository,
  vehicleId: string,
): Location {
  const getLocationQuery = new GetLocation(vehicleId);
  const handler = new GetLocationHandler(vehicleRepository);
  return handler.handle(getLocationQuery);
}
