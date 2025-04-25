import { randomUUID } from "node:crypto";

export class Vehicle {
  constructor(
    public readonly id: string,
    public type: string,
  ) {}

  static create(type: string): Vehicle {
    return new Vehicle(randomUUID(), type);
  }
}
