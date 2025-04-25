import { Fleet } from "../Fleet.js";

export interface FleetRepository {
  save(fleet: Fleet): void;
}
