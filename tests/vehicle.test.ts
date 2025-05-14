import { describe, expect, it } from "vitest";
import { Vehicle } from "../src/Domain/Models/Vehicle.js";
import { generateFrenchPlateNumber } from "./Utils/generateFrenchPlateNumber";
import { generateRandomId } from "./Utils/generateRandomId";

describe("User", () => {
  it("should create a vehicle", function () {
    const randomId = generateRandomId();
    const plateNumber = generateFrenchPlateNumber();
    const vehicle = Vehicle.create(randomId, plateNumber);

    expect(vehicle).to.be.instanceOf(Vehicle);
  });
});
