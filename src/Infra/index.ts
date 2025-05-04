import { PrismaClient } from "../../generated/prisma/index";

const prisma = new PrismaClient();

// TODO: remove this when Prisma is working properly
async function main() {
  const allFleets = await prisma.fleet.findMany();
  console.log("All fleets:", allFleets);
  const createFleet = await prisma.fleet.create({
    data: {
      id: "1",
      userId: "1",
    },
  });
  const allFleetsAfterCreate = await prisma.fleet.findMany();
  console.log("All fleets - after create:", allFleetsAfterCreate);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
