import { Location } from "./Location.js";
import { VehicleAlreadyParkedError } from "../Errors/VehicleAlreadyParkedError.js";
import { VehicleType } from "../Types/VehicleType.js";

export class Vehicle {
  private constructor(
    public readonly id: string,
    public readonly plateNumber: string,
    public type: VehicleType,
    public location?: Location,
  ) {}

  static create(
    id: string,
    plateNumber: string,
    type: VehicleType,
    location?: Location,
  ): Vehicle {
    return new Vehicle(crypto.randomUUID(), plateNumber, type, location);
  }

  static reconstruct(
    id: string,
    plateNumber: string,
    type: VehicleType,
    location?: Location,
  ): Vehicle {
    return new Vehicle(id, plateNumber, type, location);
  }

  equals(other: Vehicle): boolean {
    if (!other) return false;
    return this.plateNumber === other.plateNumber;
  }

  parkVehicle(other: Location): void {
    if (this.location == other) throw new VehicleAlreadyParkedError(this.id);

    this.location = other;
  }
}
