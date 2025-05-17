import { Fleet } from "../../../Domain/Models/Fleet";
import { FleetRepository } from "../../../Domain/Ports/FleetRepository.js";

// Secondary Adapter
export class InMemoryFleetRepository implements FleetRepository {
  private fleets: Map<string, Fleet> = new Map();

  async save(fleet: Fleet): Promise<void> {
    this.fleets.set(fleet.id, fleet);
  }

  async findById(fleetId: string): Promise<Fleet | undefined> {
    return this.fleets.get(fleetId);
  }
}
