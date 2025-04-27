import { Fleet } from "../Models/Fleet";

// Secondary Port
export interface FleetRepository {
  save(fleet: Fleet): void;
  findById(fleetId: string): Fleet | undefined;
  findByUserId(userId: string): Fleet | undefined;
}
