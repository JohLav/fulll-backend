import { Location } from "../../Domain/Models/Location.js";
import { LocationNotFoundError } from "../Errors/LocationNotFoundError.js";
import { VehicleNotFoundError } from "../Errors/VehicleNotFoundError.js";
import { VehicleRepository } from "../../Domain/Repositories/VehicleRepository.js";
import { Query, QueryHandler } from "./query.js";

export class GetLocation implements Query {
  constructor(public readonly vehicleId: string) {}
}

export class GetLocationHandler implements QueryHandler<Location> {
  constructor(private repository: VehicleRepository) {}

  handle(getLocationQuery: GetLocation): Location {
    const vehicle = this.repository.findById(getLocationQuery.vehicleId);

    if (!vehicle) {
      throw new VehicleNotFoundError(getLocationQuery.vehicleId);
    }

    if (!vehicle.location) {
      throw new LocationNotFoundError(getLocationQuery.vehicleId);
    }

    return vehicle.location;
  }
}
