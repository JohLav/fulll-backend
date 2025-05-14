import { Location } from "./Location.js";
import { Vehicle } from "./Vehicle.js";
import { VehicleAlreadyRegisteredError } from "../Errors/VehicleAlreadyRegisteredError.js";
import { VehiclePlateNotFoundError } from "../../App/Errors/VehiclePlateNotFoundError.js";
import { LocationNotFoundError } from "../../App/Errors/LocationNotFoundError.js";

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

  registerVehicle(vehicle: Vehicle): void {
    if (this.vehicles.some((v: Vehicle): boolean => v.equals(vehicle)))
      throw new VehicleAlreadyRegisteredError(vehicle.id);

    this.vehicles.push(vehicle);
  }

  findVehicleByPlateNumber(plateNumber: string): Vehicle {
    const vehicle = this.vehicles.find((v) => v.plateNumber === plateNumber);
    if (!vehicle) throw new VehiclePlateNotFoundError(plateNumber);

    return vehicle;
  }

  localizeVehicle(plateNumber: string): Location | undefined {
    const vehicle = this.findVehicleByPlateNumber(plateNumber);
    if (!vehicle.location) throw new LocationNotFoundError(plateNumber);

    return vehicle?.location;
  }
}
