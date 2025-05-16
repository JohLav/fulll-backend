import { beforeEach, describe, expect, it } from "vitest";
import { execSync } from "node:child_process";
import { resetDB } from "../Infra/Secondary/resetDB.js";

const test = (args: string) => {
  return execSync(`node ./build/src/cli.js ${args}`).toString();
};

describe("Fleet", () => {
  beforeEach(async () => {
    await resetDB();
  });

  it("Nominal case", async (): Promise<void> => {
    const fleetId = test("create 2228").trim();
    expect(fleetId.length).toBeGreaterThan(0);

    const registerResponse = test(`register-vehicle ${fleetId} AB-123-CD`);
    expect(registerResponse).toContain(fleetId);
    expect(registerResponse).toContain("AB-123-CD");

    const updateLocationResponse = test(
      `update-location ${fleetId} AB-123-CD 48.8566 2.3522 10`,
    );
    expect(updateLocationResponse).toContain(fleetId);
    expect(updateLocationResponse).toContain("AB-123-CD");
    expect(updateLocationResponse).toContain("latitude: 48.8566");
    expect(updateLocationResponse).toContain("longitude: 2.3522");

    const localizeVehicleResponse = test(
      `localize-vehicle ${fleetId} AB-123-CD`,
    );
    expect(localizeVehicleResponse).toContain(fleetId);
    expect(localizeVehicleResponse).toContain("AB-123-CD");
    expect(localizeVehicleResponse).toContain("latitude: 48.8566");
    expect(localizeVehicleResponse).toContain("longitude: 2.3522");
    expect(localizeVehicleResponse).toContain("altitude: 10");

    const updateLocationAgainResponse = test(
      `update-location ${fleetId} AB-123-CD 48.8566 2.3522 10`,
    );
    expect(updateLocationAgainResponse).toContain(
      `Error: Vehicle AB-123-CD of ${fleetId} is already parked at latitude: 48.8566, longitude: 2.3522, altitude: 10`,
    );
  });
});
