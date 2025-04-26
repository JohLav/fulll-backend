import { Vehicle } from "./Vehicle";
import { randomUUID } from "node:crypto";

// Aggregate root
export class Fleet {
  private constructor(
    public readonly id: string,
    public readonly userId: string,
    public vehicles: Vehicle[] = [],
  ) {}

  static initializeFleet(userId: string): Fleet {
    return new Fleet(randomUUID(), userId, []);
  }

  registerVehicle(vehicle: Vehicle): void {
    if (this.vehicles.some((v: Vehicle): boolean => v.equals(vehicle))) {
      throw new Error("Vehicle is already registered in the fleet");
    }

    this.vehicles.push(vehicle);
  }
}
