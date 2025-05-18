import { Query, QueryHandler } from "./query";
import { Fleet } from "../../Domain/Models/Fleet";
import { FleetNotFoundError } from "../../Domain/Errors/FleetNotFoundError";
import { FleetRepository } from "../../Domain/Ports/FleetRepository";

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
