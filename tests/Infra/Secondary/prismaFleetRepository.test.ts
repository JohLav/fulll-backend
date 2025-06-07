import { beforeEach, describe, expect, it } from "vitest";
import { fleet, updatedFleet } from "../../Domain/fleetFixtures";
import { resetDB } from "./resetDB";
import { Fleet } from "../../../src/Domain/Models/Fleet";
import { Vehicle } from "../../../src/Domain/Models/Vehicle";
import { PrismaFleetRepository } from "../../../src/Infra/Secondary/Repositories/PrismaFleetRepository";

describe("PrismaFleetRepository", (): void => {
  beforeEach(async (): Promise<void> => {
    await resetDB();
  });

  it("should save and get a fleet", async function (): Promise<void> {
    const repository = new PrismaFleetRepository();

    await repository.save(fleet());

    const retrievedFleet: Fleet = await repository.findById(fleet().id);

    expect(sortFleetVehicles(retrievedFleet)).toStrictEqual(
      sortFleetVehicles(fleet()),
    );
  });

  it("should update a fleet", async function (): Promise<void> {
    const repository = new PrismaFleetRepository();

    await repository.save(fleet());
    await repository.save(updatedFleet());

    const retrievedFleet: Fleet = await repository.findById(fleet().id);

    expect(sortFleetVehicles(retrievedFleet)).toStrictEqual(
      sortFleetVehicles(updatedFleet()),
    );
  });

  function sortFleetVehicles(fleet: Fleet | undefined): Fleet {
    if (!fleet) {
      throw new Error("Fleet is undefined");
    }

    const sortedVehicles: Vehicle[] = [...fleet.vehicles].sort(
      (a: Vehicle, b: Vehicle): number =>
        a.plateNumber.localeCompare(b.plateNumber),
    );
    return Fleet.create(fleet.id, fleet.userId, sortedVehicles);
  }
});
