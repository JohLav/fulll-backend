import { FleetRepository } from "../Domain/Repositories/FleetRepository.js";
import { Fleet } from "../Domain/Fleet.js";

// Secondary Adapter
export class InMemoryFleetRepository implements FleetRepository {
  private store = new Map<string, Fleet>();

  save(fleet: Fleet): void {
    this.store.set(fleet.id, fleet);
  }

  findById(fleetId: string): Fleet | undefined {
    return this.store.get(fleetId);
  }
}
