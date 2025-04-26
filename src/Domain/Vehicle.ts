import { randomUUID } from "node:crypto";

export enum VehicleType {
  CAR = "car",
  TRUCK = "truck",
  MOTORCYCLE = "motorcycle",
}

export class Vehicle {
  constructor(
    public readonly id: string,
    public type: VehicleType,
  ) {}

  static create(type: VehicleType): Vehicle {
    return new Vehicle(randomUUID(), type);
  }

  equals(other: Vehicle): boolean {
    return this.id === other.id;
  }
}
