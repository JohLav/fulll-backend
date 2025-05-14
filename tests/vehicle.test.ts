import { describe, expect, it } from "vitest";
import { Vehicle } from "../src/Domain/Models/Vehicle.js";
import { generateFrenchPlateNumber } from "./Utils/generateFrenchPlateNumber";

describe("User", () => {
  it("should create a vehicle", function () {
    const id = crypto.randomUUID();
    const plateNumber = generateFrenchPlateNumber();
    const vehicle = Vehicle.create(id, plateNumber);

    expect(vehicle).to.be.instanceOf(Vehicle);
  });
});
