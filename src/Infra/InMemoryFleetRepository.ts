import { Fleet } from "../Domain/Models/Fleet";
import { FleetRepository } from "../Domain/Repositories/FleetRepository";

// Secondary Adapter
export class InMemoryFleetRepository implements FleetRepository {
  private fleets: Map<string, Fleet> = new Map();

  save(fleet: Fleet): void {
    this.fleets.set(fleet.id, fleet);
  }

  findById(fleetId: string): Fleet | undefined {
    return this.fleets.get(fleetId);
  }

  findByUserId(ownerId: string): Fleet | undefined {
    return this.fleets.get(ownerId);
  }
}
