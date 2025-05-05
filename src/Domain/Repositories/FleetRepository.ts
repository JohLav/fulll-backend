import { Fleet } from "../Models/Fleet.js";
import { Vehicle } from "../Models/Vehicle.js";

// Secondary Port
export interface FleetRepository {
  save(fleet: Fleet): Promise<void>;
  findById(fleetId: string): Promise<Fleet | undefined>;
  findByUserId(userId: string): Promise<Fleet | undefined>;
  findVehicleByPlateNumber(plateNumber: string): Promise<Vehicle | undefined>;
}
