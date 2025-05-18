import { Fleet } from "../Models/Fleet";

// Secondary Port
export interface FleetRepository {
  save(fleet: Fleet): Promise<void>;
  findById(fleetId: string): Promise<Fleet | undefined>;
}
