import { describe, expect, it } from "vitest";
import { Location } from "../src/Domain/Models/Location.js";

describe("Location", () => {
  it("should create a location", (): void => {
    const location = Location.create(48.8566, 2.3522);
    expect(location).to.be.instanceOf(Location);
  });

  it("should be equal to another location", (): void => {
    const anotherLocation = Location.create(48.8566, 2.3522);
    const isSameLocation = Location.create(48.8566, 2.3522).equals(
      anotherLocation,
    );

    expect(isSameLocation).toBeTruthy();
  });
  // TODO: add test to verify altitude equality
});
