import { Vehicle } from "./Vehicle.js";
import { randomUUID } from "node:crypto";

export class Fleet {
  private constructor(
    public readonly id: string,
    public vehicles: Vehicle[] = [],
  ) {}

  static initializeFleet() {
    return new Fleet(randomUUID(), []);
  }

  registerVehicle(vehicle: Vehicle) {
    this.vehicles.push(vehicle);
  }
}
