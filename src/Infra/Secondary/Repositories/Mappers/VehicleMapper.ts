import { Location } from "../../../../Domain/Models/Location.js";
import { Vehicle } from "../../../../Domain/Models/Vehicle.js";
import { LocationMapper } from "./LocationMapper.js";

export class VehicleMapper {
  static fromPrisma(vehicle: {
    plate: string;
    location: string | null;
  }): Vehicle {
    const domainLocation: Location | undefined =
      vehicle.location === ""
        ? undefined
        : LocationMapper.toDomain(vehicle.location);
    return Vehicle.create(vehicle.plate, domainLocation);
  }
}
