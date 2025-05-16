export class VehicleAlreadyRegisteredError extends Error {
  constructor(plateNumber: string) {
    super(
      `Vehicle with plate number ${plateNumber} is already registered in the fleet.`,
    );
    this.name = "VehicleAlreadyRegisteredError";
  }
}
