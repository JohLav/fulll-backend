import { Vehicle } from "../Models/Vehicle.js";

// Secondary Port
export interface VehicleRepository {
  save(vehicle: Vehicle): void;
  findById(vehicleId: string): Vehicle | undefined;
  findByUserId(userId: string): Vehicle | undefined;
}
