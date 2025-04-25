import { FleetRepository } from "./FleetRepository.js";
import { Fleet } from "../Fleet.js";

export class InMemoryFleetRepository implements FleetRepository {
  private store = new Map<string, Fleet>();

  save(fleet: Fleet): void {
    this.store.set(fleet.id, fleet);
  }
}
