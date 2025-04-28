import "mocha";
import { expect } from "chai";
import { User } from "../src/Domain/Models/User.js";

describe("User", () => {
  describe("create", () => {
    it("should create a user", function () {
      const user = User.create();

      expect(user).to.be.instanceOf(User);
    });
  });
});
