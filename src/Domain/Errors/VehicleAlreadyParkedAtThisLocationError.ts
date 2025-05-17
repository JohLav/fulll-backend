import { Location } from "../Models/Location.js";

export class VehicleAlreadyParkedAtThisLocationError extends Error {
  constructor(vehiclePlateNumber: string, fleetId: string, location: Location) {
    super(
      `Error: Vehicle ${vehiclePlateNumber} of ${fleetId} is already parked at latitude: ${location.latitude}, longitude: ${location.longitude}, altitude: ${location.altitude}`,
    );
    this.name = "VehicleAlreadyParkedAtThisLocationError";
  }
}
