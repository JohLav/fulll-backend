import { describe, expect, it } from "vitest";
import { execSync } from "node:child_process";

const test = (args: string) => {
  const response = execSync(`node ./build/src/cli.js ${args}`).toString();
  return response;
};

describe("Create fleet", () => {
  it("Toto", async (): Promise<void> => {
    const fleetId = test("create 6183").trim();
    console.log(fleetId);
    expect(fleetId.length).toBeGreaterThan(0);

    const registerResponse = test(`register-vehicle ${fleetId} AB-123-CD`);
    expect(registerResponse).toContain(fleetId);
    expect(registerResponse).toContain("AB-123-CD");

    const updateLocationResponse = test(
      `update-location ${fleetId} AB-123-CD 48.8566 2.3522`,
    );
    expect(updateLocationResponse).toContain(fleetId);
    expect(updateLocationResponse).toContain("AB-123-CD");
    expect(updateLocationResponse).toContain("latitude: 48.8566");
    expect(updateLocationResponse).toContain("longitude: 2.3522");
  });
});
