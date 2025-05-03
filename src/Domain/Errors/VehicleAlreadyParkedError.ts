export class VehicleAlreadyParkedError extends Error {
  constructor(vehicleId: string) {
    super(`Vehicle with ID ${vehicleId} is already parked at this location.`);
    this.name = "VehicleAlreadyParkedError";
  }
}
