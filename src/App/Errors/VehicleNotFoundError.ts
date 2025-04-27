export class VehicleNotFoundError extends Error {
  constructor(vehicleId: string) {
    super(`Vehicle with ID ${vehicleId} not found`);
    this.name = "VehicleNotFoundError";
  }
}
