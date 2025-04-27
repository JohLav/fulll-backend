export class VehicleAlreadyRegisteredError extends Error {
  constructor(vehicleId: string) {
    super(`Vehicle with ID ${vehicleId} is already registered in the fleet`);
    this.name = "VehicleAlreadyRegisteredError";
  }
}
