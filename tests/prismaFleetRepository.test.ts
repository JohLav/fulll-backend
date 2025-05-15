import { describe, expect, it } from "vitest";
import { Fleet } from "../src/Domain/Models/Fleet.js";
import { Vehicle } from "../src/Domain/Models/Vehicle.js";
import { Location } from "../src/Domain/Models/Location.js";
import { PrismaFleetRepository } from "../src/Secondary/Repositories/PrismaFleetRepository.js";

function fleet() {
  return Fleet.create("7ed14d0d-6401-4b81-a06b-de9655e6f29e", "2345", [
    Vehicle.create("5810d8f5-3621-4340-9127-1d8ad2cf5a54", "AD-5648-MN"),
    Vehicle.create(
      "83c1b62c-fd42-4f6a-9504-175e08d57800",
      "BG-5147-AD",
      Location.create(48.8566, 2.3522),
    ),
    Vehicle.create(
      "546b10c4-5349-49a2-b999-7ad288b6e918",
      "GE-1234-TD",
      Location.create(48.8566, 2.3522, 105),
    ),
  ]);
}

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
  it("should save and get a fleet", async function () {
    const repository = new PrismaFleetRepository();

    await repository.save(fleet());

    const retrievedFleet = await repository.findById(fleet().id);

    expect(sortFleetVehicles(retrievedFleet)).toEqual(
      sortFleetVehicles(fleet()),
    );
  });
});
