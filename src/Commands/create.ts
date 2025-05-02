import { CommandModule } from "yargs";
import { initializeFleetForUser } from "../../features/steps/shared/initializeFleetForUser";
import { InMemoryFleetRepository } from "../Infra/Repositories/InMemoryFleetRepository";
import { User } from "../Domain/Models/User";

export const createFleetCommand: CommandModule = {
  command: "create <userId>",
  describe: "Create a fleet for a user",
  builder: (yargs) =>
    yargs.positional("userId", {
      type: "string",
      describe: "User ID",
    }),
  handler: () => {
    const user: User = User.create();
    const fleetRepository = new InMemoryFleetRepository();
    const fleetId = initializeFleetForUser(fleetRepository, user);
    console.log(fleetId);
  },
};
