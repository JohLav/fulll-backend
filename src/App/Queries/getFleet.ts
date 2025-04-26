import { FleetRepository } from "../../Domain/Repositories/FleetRepository.js";
import { Fleet } from "../../Domain/Fleet.js";
import { Query, QueryHandler } from "./query.js";

export class GetFleet implements Query {
  constructor(public readonly id: string) {}
}

export class GetFleetHandler implements QueryHandler<Fleet> {
  constructor(private repository: FleetRepository) {}

  handle(getFleetQuery: GetFleet): Fleet {
    return this.repository.findById(getFleetQuery.id);
  }
}
