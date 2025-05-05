import { CommandModule } from "yargs";
import { User } from "../Domain/Models/User.js";
import { PrismaFleetRepository } from "../Infra/Repositories/PrismaFleetRepository.js";
import { initializeFleetForUser } from "../../features/steps/shared/initializeFleetForUser.js";

export const createFleetCommand: CommandModule = {
  command: "create <userId>",
  describe: "Create a fleet for a user",
  builder: (yargs) =>
    yargs.positional("userId", {
      type: "string",
      describe: "User ID",
    }),
  handler: async (argv) => {
    const { userId } = argv;
    const user: User = User.create(userId as string);
    const repository = new PrismaFleetRepository();
    const fleetId = await initializeFleetForUser(repository, user);
    console.log(fleetId);
  },
};
