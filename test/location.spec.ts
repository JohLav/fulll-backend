import "mocha";
import { expect } from "chai";
import { Location } from "../src/Domain/Models/Location.js";

describe("Location", () => {
  describe("create", () => {
    it("should create a vehicle", function () {
      const location = Location.create(48.8566, 2.3522);

      expect(location).to.be.instanceOf(Location);
    });
  });
});
