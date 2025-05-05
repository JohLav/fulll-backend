import { Query, QueryHandler } from "./query.js";
import { Location } from "../../Domain/Models/Location.js";
import { FleetRepository } from "../../Domain/Repositories/FleetRepository.js";
import { LocationNotFoundError } from "../Errors/LocationNotFoundError.js";
import { VehiclePlateNotFoundError } from "../Errors/VehiclePlateNotFoundError.js";
import { FleetNotFoundError } from "../Errors/FleetNotFoundError.js";

export class GetLocation implements Query {
  constructor(
    public readonly fleetId: string,
    public readonly vehiclePlateNumber: string,
  ) {}
}

export class GetLocationHandler implements QueryHandler<Location> {
  constructor(private repository: FleetRepository) {}

  async handle(getLocationQuery: GetLocation): Promise<Location> {
    const fleet = await this.repository.findById(getLocationQuery.fleetId);
    if (!fleet) throw new FleetNotFoundError(getLocationQuery.fleetId);

    const vehicle = fleet.findVehicleByPlateNumber(
      getLocationQuery.vehiclePlateNumber,
    );
    if (!vehicle)
      throw new VehiclePlateNotFoundError(getLocationQuery.vehiclePlateNumber);
    if (!vehicle.location)
      throw new LocationNotFoundError(getLocationQuery.vehiclePlateNumber);

    return vehicle.location;
  }
}
