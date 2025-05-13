import { describe, expect, it } from "vitest";
import { Location } from "../src/Domain/Models/Location.js";

describe("Location", () => {
  it("should create a location without altitude", (): void => {
    const location = Location.create(48.8566, 2.3522);
    expect(location).to.be.instanceOf(Location);
  });

  it("should create a location with altitude", (): void => {
    const location = Location.create(48.8566, 2.3522, 100);
    expect(location).to.be.instanceOf(Location);
  });

  it("should be equal to another location's latitude, longitude, altitude", (): void => {
    const anotherLocation = Location.create(48.8566, 2.3522, 100);
    const isSameLocation = Location.create(48.8566, 2.3522, 100).equals(
      anotherLocation,
    );

    expect(isSameLocation).toBeTruthy();
  });
});
