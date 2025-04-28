import "mocha";
import { expect } from "chai";
import { Vehicle } from "../src/Domain/Models/Vehicle.js";
import { VehicleType } from "../src/Domain/Types/VehicleType.js";

describe("User", () => {
  describe("create", () => {
    it("should create a vehicle", function () {
      const vehicle = Vehicle.create(VehicleType.CAR);

      expect(vehicle).to.be.instanceOf(Vehicle);
    });
  });
});
