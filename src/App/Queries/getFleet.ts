import { Query, QueryHandler } from "./query.js";
import { Fleet } from "../../Domain/Models/Fleet.js";
import { FleetNotFoundError } from "../../Domain/Errors/FleetNotFoundError.js";
import { FleetRepository } from "../../Domain/Ports/FleetRepository.js";

export class GetFleet implements Query {
  constructor(public readonly fleetId: string) {}
}

export class GetFleetHandler implements QueryHandler<Fleet> {
  constructor(private repository: FleetRepository) {}

  async handle(getFleetQuery: GetFleet): Promise<Fleet> {
    const fleet = await this.repository.findById(getFleetQuery.fleetId);
    if (!fleet) {
      throw new FleetNotFoundError(getFleetQuery.fleetId);
    }

    return fleet;
  }
}
