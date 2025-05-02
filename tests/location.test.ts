import { describe, expect, test } from "vitest";
import { Location } from "../src/Domain/Models/Location.js";

describe("Location", () => {
  describe("create", () => {
    test("should create a vehicle", function () {
      const location = Location.create(48.8566, 2.3522);

      expect(location).to.be.instanceOf(Location);
    });
  });
});
