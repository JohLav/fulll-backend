import { Vehicle } from "../../Domain/Models/Vehicle.js";
import { LocationMapper } from "./LocationMapper.js";

export class PrismaVehicleMapper {
  static fromPrisma(vehicle: {
    id: string;
    plate: string;
    location: string | null;
  }): Vehicle {
    const locationString = vehicle.location ?? undefined;

    return Vehicle.create(
      vehicle.id,
      vehicle.plate,
      LocationMapper.toDomain(locationString),
    );
  }
}
