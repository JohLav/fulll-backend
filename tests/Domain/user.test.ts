import { describe, expect, it } from "vitest";
import { User } from "../../src/Domain/Models/User";

describe("User", () => {
  it("should create a user", function () {
    const user = User.create(crypto.randomUUID());

    expect(user).to.be.instanceOf(User);
  });
});
