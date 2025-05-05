export class LocationNotFoundError extends Error {
  constructor(vehiclePlateNumber: string) {
    super(
      `Location for the vehicle with plate number ${vehiclePlateNumber} not found.`,
    );
    this.name = "LocationNotFoundError";
  }
}
