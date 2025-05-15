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
    try {
      const parsed = JSON.parse(prismaString);

      if (
        typeof parsed.latitude === "number" &&
        typeof parsed.longitude === "number" &&
        typeof parsed.altitude === "number"
      ) {
        return Location.create(
          parsed.latitude,
          parsed.longitude,
          parsed.altitude,
        );
      }

      console.warn("Invalid location format:", parsed);
    } catch (error) {
      console.warn("Failed to parse location:", prismaString, error);
      return undefined;
    }
  }
}
