import { Fleet } from "../../Domain/Models/Fleet.js";
import { FleetRepository } from "../../Domain/Repositories/FleetRepository.js";
import { Vehicle } from "../../Domain/Models/Vehicle.js";

// Secondary Adapter
export class InMemoryFleetRepository implements FleetRepository {
  private fleets: Map<string, Fleet> = new Map();
  private vehicles: Map<string, Vehicle> = new Map();

  async save(fleet: Fleet): Promise<void> {
    this.fleets.set(fleet.id, fleet);
  }

  async findById(fleetId: string): Promise<Fleet | undefined> {
    return this.fleets.get(fleetId);
  }

  async findVehicleByPlateNumber(
    plateNumber: string,
  ): Promise<Vehicle | undefined> {
    return Array.from(this.vehicles.values()).find(
      (v) => v.plateNumber === plateNumber,
    );
  }
}
