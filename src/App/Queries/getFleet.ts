import { FleetRepository } from "../../Domain/Repositories/FleetRepository.js";
import { Fleet } from "../../Domain/Fleet.js";

export class GetFleet {
  constructor(public readonly id: string) {}
}

export class GetFleetHandler {
  constructor(private repository: FleetRepository) {}

  handle(getFleetQuery: GetFleet): Fleet {
    return this.repository.findById(getFleetQuery.id);
  }
}
