import { randomUUID } from "node:crypto";
import { VehicleType } from "../Types/VehicleType.js";

export class Vehicle {
  constructor(
    public readonly id: string,
    public type: VehicleType,
  ) {}

  static create(type: VehicleType): Vehicle {
    return new Vehicle(randomUUID(), type);
  }

  equals(other: Vehicle): boolean {
    return this.id === other.id;
  }
}
