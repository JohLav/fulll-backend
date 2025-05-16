import { beforeEach, describe, expect, it } from "vitest";
import { Fleet } from "../../../src/Domain/Models/Fleet";
import { PrismaFleetRepository } from "../../../src/Secondary/Repositories/PrismaFleetRepository";
import { fleet, updatedFleet } from "../../Domain/fleetFixtures";
import { resetDB } from "./resetDB";

function sortFleetVehicles(fleet: Fleet | undefined): Fleet {
  if (!fleet) {
    throw new Error("Fleet is undefined");
  }

  const sortedVehicles = [...fleet.vehicles].sort((a, b) =>
    a.id.localeCompare(b.id),
  );
  return Fleet.create(fleet.id, fleet.userId, sortedVehicles);
}

describe("PrismaFleetRepository", () => {
  beforeEach(async () => {
    await resetDB();
  });

  it("should save and get a fleet", async function () {
    const repository = new PrismaFleetRepository();

    await repository.save(fleet());

    const retrievedFleet = await repository.findById(fleet().id);

    expect(sortFleetVehicles(retrievedFleet)).toStrictEqual(
      sortFleetVehicles(fleet()),
    );
  });

  it("should update a fleet", async function () {
    const repository = new PrismaFleetRepository();

    await repository.save(fleet());
    await repository.save(updatedFleet());

    const retrievedFleet = await repository.findById(fleet().id);

    expect(sortFleetVehicles(retrievedFleet)).toStrictEqual(
      sortFleetVehicles(updatedFleet()),
    );
  });
});
