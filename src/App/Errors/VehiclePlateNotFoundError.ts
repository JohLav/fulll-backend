export class VehiclePlateNotFoundError extends Error {
  constructor(plateNumber: string) {
    super(`Vehicle with plate number ${plateNumber} not found.`);
    this.name = "VehiclePlateNotFoundError";
  }
}
