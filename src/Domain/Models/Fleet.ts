import { Location } from "./Location.js";
import { Vehicle } from "./Vehicle.js";
import { VehicleAlreadyRegisteredError } from "../Errors/VehicleAlreadyRegisteredError.js";
import { VehiclePlateNotFoundError } from "../Errors/VehiclePlateNotFoundError.js";
import { LocationNotFoundError } from "../Errors/LocationNotFoundError.js";

// Aggregate root
export class Fleet {
  private constructor(
    public readonly id: string,
    public readonly userId: string,
    public vehicles: Vehicle[],
  ) {}

  static create(id: string, userId: string, vehicles: Vehicle[]): Fleet {
    return new Fleet(id, userId, vehicles);
  }

  registerVehicle(vehiclePlateNumber: string): void {
    const vehicle = Vehicle.create(
      this.generateVehicleId() as string,
      vehiclePlateNumber as string,
    );
    if (this.vehicles.some((v: Vehicle): boolean => v.equals(vehicle)))
      throw new VehicleAlreadyRegisteredError(vehicle.id);

    this.vehicles.push(vehicle);
  }

  parkVehicle(plateNumber: string, location: Location) {
    const vehicle = this.findVehicleByPlateNumber(plateNumber);

    vehicle.parkVehicle(location, this.id);
  }

  localizeVehicle(plateNumber: string): Location {
    const vehicle = this.findVehicleByPlateNumber(plateNumber);
    if (!vehicle.location) throw new LocationNotFoundError(plateNumber);

    return vehicle.location;
  }

  private findVehicleByPlateNumber(plateNumber: string): Vehicle {
    const vehicle = this.vehicles.find((v) => v.plateNumber === plateNumber);
    if (!vehicle) throw new VehiclePlateNotFoundError(plateNumber);

    return vehicle;
  }

  private generateVehicleId() {
    return crypto.randomUUID(); // TODO: Add a port
  }
}
