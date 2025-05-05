import { Vehicle } from "../../Domain/Models/Vehicle.js";
import { VehicleTypeMapper } from "./VehicleTypeMapper.js";
import { LocationMapper } from "./LocationMapper.js";
import { VehicleType as PrismaVehicleType } from "../../../generated/prisma/index.js";

export class PrismaVehicleMapper {
  static fromPrisma(vehicle: {
    id: string;
    plate: string;
    type: PrismaVehicleType;
    location: string;
  }): Vehicle {
    return Vehicle.reconstruct(
      vehicle.id,
      vehicle.plate,
      VehicleTypeMapper.toDomain(vehicle.type),
      LocationMapper.toDomain(vehicle.location),
    );
  }
}
