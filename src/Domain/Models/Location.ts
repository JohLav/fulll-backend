// Value Object
export class Location {
  private constructor(
    public readonly latitude: number,
    public readonly longitude: number,
    public readonly altitude: number,
  ) {}

  static create(
    latitude: number,
    longitude: number,
    altitude?: number,
  ): Location {
    return new Location(latitude, longitude, altitude ?? 0);
  }

  equals(other: Location): boolean {
    if (!other) return false;
    return (
      this.latitude === other.latitude &&
      this.longitude === other.longitude &&
      this.altitude === other.altitude
    );
  }
}
