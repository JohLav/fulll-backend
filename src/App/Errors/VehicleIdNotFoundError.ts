export class VehicleIdNotFoundError extends Error {
  constructor(vehicleId: string) {
    super(`Vehicle with ID ${vehicleId} not found.`);
    this.name = "VehicleIdNotFoundError";
  }
}
