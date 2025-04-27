import { randomUUID } from "node:crypto";
import { VehicleType } from "../Types/VehicleType.js";
import { Location } from "./Location.js";

export class Vehicle {
  constructor(
    public readonly id: string,
    public type: VehicleType,
    public location?: Location,
  ) {}

  static create(type: VehicleType): Vehicle {
    return new Vehicle(randomUUID(), type);
  }

  equals(other: Vehicle): boolean {
    return this.id === other.id;
  }

  parkVehicle(location: Location): void {
    this.location = location;
  }
}
