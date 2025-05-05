import { VehicleType as DomainVehicleType } from "../../Domain/Types/VehicleType.js";
import { VehicleType as PrismaVehicleType } from "@prisma/client";

export class VehicleTypeMapper {
  static toPrisma(type: DomainVehicleType): PrismaVehicleType {
    return type as unknown as PrismaVehicleType;
  }

  static toDomain(type: PrismaVehicleType): DomainVehicleType {
    return type as DomainVehicleType;
  }
}
