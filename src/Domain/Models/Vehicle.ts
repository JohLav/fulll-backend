import { Location } from "./Location.js";
import { VehicleAlreadyParkedError } from "../Errors/VehicleAlreadyParkedError.js";
import { VehicleType } from "../Types/VehicleType.js";

export class Vehicle {
  constructor(
    public readonly id: string,
    public readonly plateNumber: string,
    public type: VehicleType,
    public location?: Location,
  ) {}

  static create(plateNumber: string, type: VehicleType): Vehicle {
    return new Vehicle(crypto.randomUUID(), plateNumber, type);
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
