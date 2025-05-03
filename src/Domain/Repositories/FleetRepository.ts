import { Fleet } from "../Models/Fleet.js";
import { Vehicle } from "../Models/Vehicle.js";

// Secondary Port
export interface FleetRepository {
  save(fleet: Fleet): void;
  findById(fleetId: string): Fleet | undefined;
  findByUserId(userId: string): Fleet | undefined;
  findVehicleByPlateNumber(plateNumber: string): Vehicle | undefined;
}
