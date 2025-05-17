import { Location } from "../../Domain/Models/Location.js";

export class LocationMapper {
  static toPrisma(location: Location): string {
    return JSON.stringify({
      latitude: location.latitude,
      longitude: location.longitude,
      altitude: location.altitude,
    });
  }

  static toDomain(prismaString: string | null): Location | undefined {
    if (prismaString === null || prismaString === "") return undefined;

    const parsed = JSON.parse(prismaString);

    return Location.create(parsed.latitude, parsed.longitude, parsed.altitude);
  }
}
