import { Query, QueryHandler } from "./query";
import { Location } from "../../Domain/Models/Location";
import { FleetNotFoundError } from "../../Domain/Errors/FleetNotFoundError";
import { FleetRepository } from "../../Domain/Ports/FleetRepository";

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

    return fleet.localizeVehicle(getLocationQuery.vehiclePlateNumber);
  }
}
