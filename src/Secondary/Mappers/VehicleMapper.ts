import { Vehicle } from "../../Domain/Models/Vehicle.js";
import { LocationMapper } from "./LocationMapper.js";
import { Location } from "../../Domain/Models/Location";

export class VehicleMapper {
  static fromPrisma(vehicle: {
    id: string;
    plate: string;
    location: string | null;
  }): Vehicle {
    const domainLocation: Location | undefined =
      vehicle.location === ""
        ? undefined
        : LocationMapper.toDomain(vehicle.location);
    return Vehicle.create(vehicle.id, vehicle.plate, domainLocation);
  }
}
