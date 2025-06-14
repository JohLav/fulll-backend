import { execSync } from "node:child_process";
import { beforeEach, describe, expect, it } from "vitest";
import { resetDB } from "../Infra/Secondary/resetDB";

const test = (args: string): string => {
  return execSync(`node ./dist/src/cli.js ${args}`).toString();
};

describe("Fleet", (): void => {
  beforeEach(async (): Promise<void> => {
    await resetDB();
  });

  it("Nominal case", async (): Promise<void> => {
    const fleetId: string = createFleet();
    expect(fleetId.length).toBeGreaterThan(0);

    const registerResponse: string = registerVehicle(fleetId);
    expect(registerResponse).toContain(fleetId);
    expect(registerResponse).toContain("AB-123-CD");

    const updateLocationResponse: string = parkVehicle(fleetId);
    expect(updateLocationResponse).toContain(fleetId);
    expect(updateLocationResponse).toContain("AB-123-CD");
    expect(updateLocationResponse).toContain("latitude: 48.8566");
    expect(updateLocationResponse).toContain("longitude: 2.3522");

    const localizeVehicleResponse: string = localizeVehicle(fleetId);
    expect(localizeVehicleResponse).toContain(fleetId);
    expect(localizeVehicleResponse).toContain("AB-123-CD");
    expect(localizeVehicleResponse).toContain("latitude: 48.8566");
    expect(localizeVehicleResponse).toContain("longitude: 2.3522");
    expect(localizeVehicleResponse).toContain("altitude: 10");

    const updateLocationAgainResponse: string = parkVehicle(fleetId);
    expect(updateLocationAgainResponse).toContain(
      `Error: Vehicle AB-123-CD of ${fleetId} is already parked at latitude: 48.8566, longitude: 2.3522, altitude: 10`,
    );
  });

  function createFleet(): string {
    return test("create 2228").trim();
  }

  function registerVehicle(fleetId: string): string {
    return test(`register-vehicle ${fleetId} AB-123-CD`);
  }

  function parkVehicle(fleetId: string): string {
    return test(`update-location ${fleetId} AB-123-CD 48.8566 2.3522 10`);
  }

  function localizeVehicle(fleetId: string): string {
    return test(`localize-vehicle ${fleetId} AB-123-CD`);
  }
});
