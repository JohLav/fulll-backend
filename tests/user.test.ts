import { describe, expect, test } from "vitest";
import { User } from "../src/Domain/Models/User.js";

describe("User", () => {
  describe("create", () => {
    test("should create a user", function () {
      const user = User.create(crypto.randomUUID());

      expect(user).to.be.instanceOf(User);
    });
  });
});
