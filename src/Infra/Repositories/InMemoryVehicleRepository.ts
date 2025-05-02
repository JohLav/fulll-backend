import { Vehicle } from "../../Domain/Models/Vehicle";
import { VehicleRepository } from "../../Domain/Repositories/VehicleRepository";

// Secondary Adapter
export class InMemoryVehicleRepository implements VehicleRepository {
  private vehicles: Map<string, Vehicle> = new Map();

  save(vehicle: Vehicle): void {
    this.vehicles.set(vehicle.id, vehicle);
  }

  findById(vehicleId: string): Vehicle | undefined {
    return this.vehicles.get(vehicleId);
  }

  findByUserId(userId: string): Vehicle | undefined {
    return this.vehicles.get(userId);
  }

  findByPlateNumber(plateNumber: string): Vehicle | undefined {
    return Array.from(this.vehicles.values()).find(
      (v) => v.plateNumber === plateNumber,
    );
  }
}
