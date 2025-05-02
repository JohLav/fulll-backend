import { describe, expect, test } from "vitest";
import { User } from "../src/Domain/Models/User.js";
import { randomUUID } from "node:crypto";

describe("User", () => {
  describe("create", () => {
    test("should create a user", function () {
      const user = User.create(randomUUID());

      expect(user).to.be.instanceOf(User);
    });
  });
});
