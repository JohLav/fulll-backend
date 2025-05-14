import { Location } from "./Location.js";
import { VehicleAlreadyParkedError } from "../Errors/VehicleAlreadyParkedError.js";

export class Vehicle {
  private constructor(
    public readonly id: string,
    public readonly plateNumber: string, // TODO: Value Object ?
    public location?: Location,
  ) {}

  static create(id: string, plateNumber: string, location?: Location): Vehicle {
    return new Vehicle(crypto.randomUUID(), plateNumber, location);
  }

  static reconstruct(
    id: string,
    plateNumber: string,
    location?: Location,
  ): Vehicle {
    return new Vehicle(id, plateNumber, location);
  }

  equals(other: Vehicle): boolean {
    if (!other) return false;
    return this.id === other.id;
  }

  parkVehicle(other: Location): void {
    if (this.location == other) throw new VehicleAlreadyParkedError(this.id);

    this.location = other;
  }
}
