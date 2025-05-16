export class VehicleAlreadyParkedAtThisLocationError extends Error {
  constructor(
    vehiclePlateNumber: string,
    fleetId: string,
    latitude: number,
    longitude: number,
    altitude: number,
  ) {
    super(
      `Error: Vehicle ${vehiclePlateNumber} of ${fleetId} is already parked at latitude: ${latitude}, longitude: ${longitude}, altitude: ${altitude}`,
    );
    this.name = "VehicleAlreadyParkedAtThisLocationError";
  }
}
