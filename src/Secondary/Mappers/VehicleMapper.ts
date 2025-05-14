import { Vehicle } from "../../Domain/Models/Vehicle.js";
import { LocationMapper } from "./LocationMapper.js";

export class VehicleMapper {
  static fromPrisma(vehicle: {
    id: string;
    plate: string;
    location: string;
  }): Vehicle {
    return Vehicle.create(
      vehicle.id,
      vehicle.plate,
      LocationMapper.toDomain(vehicle.location),
    );
  }
}
