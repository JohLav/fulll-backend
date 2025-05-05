import { Location } from "./Location.js";
import { Vehicle } from "./Vehicle.js";
import { VehicleAlreadyRegisteredError } from "../Errors/VehicleAlreadyRegisteredError.js";
import { VehiclePlateNotFoundError } from "../../App/Errors/VehiclePlateNotFoundError.js";

// Aggregate root
export class Fleet {
  private constructor(
    public readonly id: string,
    public readonly userId: string,
    public vehicles: Vehicle[] = [],
  ) {}

  static initializeFleet(userId: string): Fleet {
    return new Fleet(crypto.randomUUID(), userId, []);
  }

  static create(id: string, userId: string, vehicles: Vehicle[] = []): Fleet {
    return new Fleet(id, userId, vehicles);
  }

  registerVehicle(vehicle: Vehicle): void {
    if (this.vehicles.some((v: Vehicle): boolean => v.equals(vehicle)))
      throw new VehicleAlreadyRegisteredError(vehicle.id);

    this.vehicles.push(vehicle);
  }

  findVehicleByPlateNumber(plateNumber: string): Vehicle | undefined {
    const vehicle = this.vehicles.find((v) => v.plateNumber === plateNumber);
    if (!vehicle) throw new VehiclePlateNotFoundError(plateNumber);

    return vehicle;
  }

  localizeVehicle(plateNumber: string, location: Location): void {
    const vehicle = this.findVehicleByPlateNumber(plateNumber);
    if (!vehicle) throw new VehiclePlateNotFoundError(plateNumber);

    vehicle.parkVehicle(location);
  }
}
