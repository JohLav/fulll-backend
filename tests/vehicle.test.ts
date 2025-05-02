import { describe, expect, test } from "vitest";
import { Vehicle } from "../src/Domain/Models/Vehicle.js";
import { VehicleType } from "../src/Domain/Types/VehicleType.js";

describe("User", () => {
  describe("create", () => {
    test("should create a vehicle", function () {
      const vehicle = Vehicle.create(VehicleType.CAR);

      expect(vehicle).to.be.instanceOf(Vehicle);
    });
  });
});
