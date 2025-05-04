import { Location } from "../../Domain/Models/Location.js";

export class LocationMapper {
  static toPrisma(location: Location): string {
    return JSON.stringify({
      latitude: location.latitude,
      longitude: location.longitude,
      altitude: location.altitude,
    });
  }

  static toDomain(locationString: string): Location | undefined {
    const { latitude, longitude, altitude } = JSON.parse(locationString);
    return Location.create(latitude, longitude, altitude);
  }
}
