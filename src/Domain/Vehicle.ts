import { randomUUID } from "node:crypto";

export class Vehicle {
  constructor(
    public readonly id: string, // Value Object VehicleId & FleetId
    public type: string, // Value Object VehicleType avec string OU plutôt enum
  ) {}

  static create(type: string): Vehicle {
    return new Vehicle(randomUUID(), type);
  }
}
