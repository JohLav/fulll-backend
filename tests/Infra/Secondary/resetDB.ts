import { prisma } from "../../../src/Infra/Secondary/client";

export async function resetDB() {
  console.log("Resetting database...");
  await prisma.vehiclesInFleets.deleteMany();
  await prisma.fleet.deleteMany();
  await prisma.vehicle.deleteMany();
}
