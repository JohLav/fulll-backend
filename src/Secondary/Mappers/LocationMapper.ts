import { Location } from "../../Domain/Models/Location.js";

export class LocationMapper {
  static toPrisma(location: Location): string {
    return JSON.stringify({
      latitude: location.latitude,
      longitude: location.longitude,
      altitude: location.altitude,
    });
  }

  static toDomain(locationString: string | undefined): Location | undefined {
    try {
      const parsed =
        typeof locationString === "string" &&
        JSON.parse(locationString as string);

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
      return undefined;
    } catch (error) {
      console.warn("Failed to parse location:", locationString, error);
      return undefined;
    }
  }
}
