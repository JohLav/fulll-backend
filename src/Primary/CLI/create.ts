import { CommandModule } from "yargs";
import { User } from "../../Domain/Models/User.js";
import { PrismaFleetRepository } from "../../Secondary/Repositories/PrismaFleetRepository.js";
import {
  InitializeFleet,
  InitializeFleetHandler,
} from "../../App/Commands/initializeFleet.js";

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
    const initializeFleet = new InitializeFleet(user.id);
    const handler = new InitializeFleetHandler(repository);
    const fleetId = await handler.handle(initializeFleet);
    console.log(fleetId);
  },
};
