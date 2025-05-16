import { Location } from "./Location.js";
import { VehicleAlreadyParkedAtThisLocationError } from "../Errors/VehicleAlreadyParkedAtThisLocationError.js";

export class Vehicle {
  private constructor(
    public readonly id: string,
    public readonly plateNumber: string,
    public location?: Location,
  ) {}

  static create(id: string, plateNumber: string, location?: Location): Vehicle {
    return new Vehicle(id, plateNumber, location);
  }

  equals(other: Vehicle): boolean {
    if (!other) return false;
    return this.id === other.id;
  }

  parkVehicle(other: Location, fleetId: string): void {
    if (this.location && this.location.equals(other))
      throw new VehicleAlreadyParkedAtThisLocationError(
        this.id,
        this.plateNumber,
        fleetId,
        other.latitude,
        other.longitude,
        other.altitude,
      );

    this.location = other;
  }
}
