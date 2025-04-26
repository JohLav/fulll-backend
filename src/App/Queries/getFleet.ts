import { Fleet } from "../../Domain/Models/Fleet";
import { FleetRepository } from "../../Domain/Repositories/FleetRepository.js";
import { Query, QueryHandler } from "./query";

export class GetFleet implements Query {
  constructor(public readonly id: string) {}
}

export class GetFleetHandler implements QueryHandler<Fleet> {
  constructor(private repository: FleetRepository) {}

  handle(getFleetQuery: GetFleet): Fleet {
    return this.repository.findById(getFleetQuery.id);
  }
}
