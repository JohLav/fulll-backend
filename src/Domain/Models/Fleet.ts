import { Location } from "./Location";
import { Vehicle } from "./Vehicle";
import { VehicleAlreadyRegisteredError } from "../Errors/VehicleAlreadyRegisteredError";
import { VehiclePlateNotFoundError } from "../Errors/VehiclePlateNotFoundError";
import { LocationNotFoundError } from "../Errors/LocationNotFoundError";

// Aggregate root
export class Fleet {
  private constructor(
    public readonly id: string,
    public readonly userId: string,
    public readonly vehicles: Vehicle[],
  ) {}

  static create(id: string, userId: string, vehicles: Vehicle[]): Fleet {
    return new Fleet(id, userId, vehicles);
  }

  registerVehicle(vehiclePlateNumber: string): void {
    this.ensureVehicleIsNotAlreadyRegistered(vehiclePlateNumber);

    this.addVehicle(vehiclePlateNumber);
  }

  parkVehicle(plateNumber: string, location: Location): void {
    const vehicle = this.findVehicleByPlateNumberOrThrow(plateNumber);

    vehicle.parkVehicle(location, this.id);
  }

  localizeVehicle(plateNumber: string): Location {
    const vehicle = this.findVehicleByPlateNumberOrThrow(plateNumber);

    return this.findLocationOrThrow(vehicle, plateNumber);
  }

  private findLocationOrThrow(vehicle: Vehicle, plateNumber: string): Location {
    if (!vehicle.location) throw new LocationNotFoundError(plateNumber);

    return vehicle.location;
  }

  private addVehicle(vehiclePlateNumber: string): void {
    const vehicle = Vehicle.create(vehiclePlateNumber);

    this.vehicles.push(vehicle);
  }

  private ensureVehicleIsNotAlreadyRegistered(
    vehiclePlateNumber: string,
  ): void {
    const existingVehicle = this.findVehicleByPlateNumber(vehiclePlateNumber);

    if (existingVehicle)
      throw new VehicleAlreadyRegisteredError(existingVehicle.plateNumber);
  }

  private findVehicleByPlateNumberOrThrow(plateNumber: string): Vehicle {
    const vehicle = this.findVehicleByPlateNumber(plateNumber);
    if (!vehicle) throw new VehiclePlateNotFoundError(plateNumber);

    return vehicle;
  }

  private findVehicleByPlateNumber(plateNumber: string): Vehicle | undefined {
    return this.vehicles.find((v) => v.plateNumber === plateNumber);
  }
}
