import { Vehicle } from "./Vehicle.js";

export class Fleet {
  constructor(
    public id: string,
    public vehicles: Vehicle[] = [],
  ) {}

  static initializeWithVehicles(id: string): Fleet {
    return new Fleet("1", [new Vehicle("1", "car"), new Vehicle("2", "car")]);
  }
}
