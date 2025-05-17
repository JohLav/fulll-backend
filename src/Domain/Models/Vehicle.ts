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

  parkVehicle(location: Location, fleetId: string): void {
    this.ensureVehicleIsNotAlreadyParkedAt(location, fleetId);

    this.location = location;
  }

  private ensureVehicleIsNotAlreadyParkedAt(
    location: Location,
    fleetId: string,
  ): void {
    if (this.location && this.location.equals(location))
      throw new VehicleAlreadyParkedAtThisLocationError(
        this.plateNumber,
        fleetId,
        location,
      );
  }
}
