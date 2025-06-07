import { describe, expect, it } from "vitest";
import { Location } from "../../src/Domain/Models/Location";

describe("Location", (): void => {
  it("should create a location without altitude", (): void => {
    const location: Location = Location.create(48.8566, 2.3522);
    expect(location.altitude).toBe(0);
  });

  it("should be equal to another location's latitude, longitude, altitude", (): void => {
    const aLocation: Location = Location.create(48.8566, 2.3522, 100);
    const sameLocation: Location = Location.create(48.8566, 2.3522, 100);
    expect(sameLocation.equals(aLocation)).toBeTruthy();
  });
});
