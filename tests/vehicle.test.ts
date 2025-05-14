import { describe, expect, it } from "vitest";
import { Vehicle } from "../src/Domain/Models/Vehicle.js";
import { VehicleType } from "../src/Domain/Types/VehicleType.js";
import { generateFrenchPlateNumber } from "./Utils/generateFrenchPlateNumber";

describe("User", () => {
  it("should create a vehicle", function () {
    const id = crypto.randomUUID();
    const plateNumber = generateFrenchPlateNumber();
    const vehicle = Vehicle.create(id, plateNumber, VehicleType.CAR);

    expect(vehicle).to.be.instanceOf(Vehicle);
  });
});
