export class LocationNotFoundError extends Error {
  constructor(vehicleId: string) {
    super(`Location for the vehicle with ID ${vehicleId} not found`);
    this.name = "LocationNotFoundError";
  }
}
