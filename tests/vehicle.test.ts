import { describe, expect, test } from "vitest";
import { Vehicle } from "../src/Domain/Models/Vehicle.js";
import { VehicleType } from "../src/Domain/Types/VehicleType.js";
import { generateFrenchPlateNumber } from "../src/Utils/generateFrenchPlateNumber";

describe("User", () => {
  describe("create", () => {
    test("should create a vehicle", function () {
      const id = crypto.randomUUID();
      const plateNumber = generateFrenchPlateNumber();
      const vehicle = Vehicle.create(id, plateNumber, VehicleType.CAR);

      expect(vehicle).to.be.instanceOf(Vehicle);
    });
  });
});
