export class FleetNotFoundError extends Error {
  constructor(fleetId: string) {
    super(`Fleet with ID ${fleetId} not found`);
    this.name = "FleetNotFoundError";
  }
}
