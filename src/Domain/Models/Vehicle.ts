import { randomUUID } from "node:crypto";
import { VehicleType } from "../Types/VehicleType.js";
import { LocationType } from "../Types/LocationType.js";

export class Vehicle {
  constructor(
    public readonly id: string,
    public type: VehicleType,
    public location?: LocationType,
  ) {}

  static create(type: VehicleType, location?: LocationType): Vehicle {
    return new Vehicle(randomUUID(), type, location);
  }

  equals(other: Vehicle): boolean {
    return this.id === other.id;
  }
}
