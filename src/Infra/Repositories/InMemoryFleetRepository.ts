import { Fleet } from "../../Domain/Models/Fleet.js";
import { FleetRepository } from "../../Domain/Repositories/FleetRepository.js";
import { Vehicle } from "../../Domain/Models/Vehicle.js";

// Secondary Adapter
export class InMemoryFleetRepository implements FleetRepository {
  private fleets: Map<string, Fleet> = new Map();
  private vehicles: Map<string, Vehicle> = new Map();

  save(fleet: Fleet): void {
    this.fleets.set(fleet.id, fleet);
  }

  findById(fleetId: string): Fleet | undefined {
    return this.fleets.get(fleetId);
  }

  findByUserId(userId: string): Fleet | undefined {
    return this.fleets.get(userId);
  }

  findVehicleByPlateNumber(plateNumber: string): Vehicle | undefined {
    return Array.from(this.vehicles.values()).find(
      (v) => v.plateNumber === plateNumber,
    );
  }
}
