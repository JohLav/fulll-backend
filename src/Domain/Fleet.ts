import { Vehicle } from "./Vehicle.js";
import { randomUUID } from "node:crypto";

export class Fleet {
  private constructor(
    public readonly id: string,
    public vehicles: Vehicle[] = [],
  ) {}

  static initializeFleet(): Fleet {
    return new Fleet(randomUUID(), []);
  }

  registerVehicle(vehicle: Vehicle): void {
    if (this.vehicles.some((v: Vehicle): boolean => v.equals(vehicle))) {
      throw new Error("Vehicle is already registered in the fleet");
    }

    this.vehicles.push(vehicle);
  }
}
