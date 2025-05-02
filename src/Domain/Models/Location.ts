// Value Object
export class Location {
  private constructor(
    public readonly latitude: number,
    public readonly longitude: number,
  ) {}

  static create(latitude: number, longitude: number): Location {
    return new Location(latitude, longitude);
  }

  equals(other: Location): boolean {
    if (!other) return false;
    return (
      this.latitude === other.latitude && this.longitude === other.longitude
    );
  }
}
