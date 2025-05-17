import { Fleet } from "../Models/Fleet.js";

// Secondary Port
export interface FleetRepository {
  save(fleet: Fleet): Promise<void>;
  findById(fleetId: string): Promise<Fleet | undefined>;
}
