import { Fleet } from "../../Domain/Models/Fleet.js";
import { FleetRepository } from "../../Domain/Repositories/FleetRepository.js";
import { FleetNotFoundError } from "../Errors/FleetNotFoundError.js";
import { Query, QueryHandler } from "./query.js";

export class GetFleet implements Query {
  constructor(public readonly fleetId: string) {}
}

export class GetFleetHandler implements QueryHandler<Fleet> {
  constructor(private repository: FleetRepository) {}

  handle(getFleetQuery: GetFleet): Fleet {
    const fleet = this.repository.findById(getFleetQuery.fleetId);

    if (!fleet) {
      throw new FleetNotFoundError(getFleetQuery.fleetId);
    }

    return fleet;
  }
}
