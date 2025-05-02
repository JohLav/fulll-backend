import { CommandModule } from "yargs";
import { initializeFleetForUser } from "../../features/steps/shared/initializeFleetForUser.js";
import { InMemoryFleetRepository } from "../Infra/Repositories/InMemoryFleetRepository.js";
import { User } from "../Domain/Models/User.js";

export const createFleetCommand: CommandModule = {
  command: "create <userId>",
  describe: "Create a fleet for a user",
  builder: (yargs) =>
    yargs.positional("userId", {
      type: "string",
      describe: "User ID",
    }),
  handler: (argv) => {
    const { userId } = argv;
    const user: User = User.create(userId as string);
    const fleetRepository = new InMemoryFleetRepository();
    const fleetId = initializeFleetForUser(fleetRepository, user);
    console.log(fleetId);
  },
};
