import { Query, QueryHandler } from "./query.js";
import { Fleet } from "../../Domain/Models/Fleet.js";
import { FleetRepository } from "../../Domain/Repositories/FleetRepository.js";
import { FleetNotFoundError } from "../Errors/FleetNotFoundError.js";

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
