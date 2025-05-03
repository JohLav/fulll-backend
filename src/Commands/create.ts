import { CommandModule } from "yargs";
import { User } from "../Domain/Models/User.js";
import { InMemoryFleetRepository } from "../Infra/Repositories/InMemoryFleetRepository.js";
import { initializeFleetForUser } from "../../features/steps/shared/initializeFleetForUser.js";

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
    const repository = new InMemoryFleetRepository();
    const fleetId = initializeFleetForUser(repository, user);
    console.log(fleetId);
  },
};
