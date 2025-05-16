import { describe, expect, it } from "vitest";
import { Vehicle } from "../../src/Domain/Models/Vehicle";
import { generateFrenchPlateNumber } from "../Utils/generateFrenchPlateNumber";

describe("User", () => {
  it("should create a vehicle", function () {
    const vehicle = Vehicle.create(generateFrenchPlateNumber());

    expect(vehicle).to.be.instanceOf(Vehicle);
  });
});
