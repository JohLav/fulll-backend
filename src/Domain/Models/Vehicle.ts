import { randomUUID } from "node:crypto";
import { VehicleType } from "../Types/VehicleType.js";
import { Location } from "./Location.js";
import { VehicleAlreadyParkedError } from "../Errors/VehicleAlreadyParkedError.js";

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

  parkVehicle(other: Location): void {
    if (this.location == other) throw new VehicleAlreadyParkedError(this.id);

    this.location = other;
  }
}
