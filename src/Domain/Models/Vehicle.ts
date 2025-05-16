import { Location } from "./Location.js";
import { VehicleAlreadyParkedAtThisLocationError } from "../Errors/VehicleAlreadyParkedAtThisLocationError.js";

export class Vehicle {
  private constructor(
    public readonly plateNumber: string,
    public location?: Location,
  ) {}

  static create(plateNumber: string, location?: Location): Vehicle {
    return new Vehicle(plateNumber, location);
  }

  parkVehicle(other: Location, fleetId: string): void {
    if (this.location && this.location.equals(other))
      throw new VehicleAlreadyParkedAtThisLocationError(
        this.plateNumber,
        fleetId,
        other.latitude,
        other.longitude,
        other.altitude,
      );

    this.location = other;
  }
}
