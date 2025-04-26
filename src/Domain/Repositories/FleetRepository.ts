import { Fleet } from "../Fleet.js";

// Secondary Port
export interface FleetRepository {
  save(fleet: Fleet): void;

  findById(fleetId: string): Fleet | undefined;
}
