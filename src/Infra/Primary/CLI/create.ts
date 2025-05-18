import { CommandModule } from "yargs";
import { PrismaFleetRepository } from "../../Secondary/Repositories/PrismaFleetRepository";
import {
  InitializeFleet,
  InitializeFleetHandler,
} from "../../../App/Commands/initializeFleet";

export const createFleetCommand: CommandModule = {
  command: "create <userId>",
  describe: "Create a fleet for the given user ID",
  builder: (yargs) =>
    yargs.positional("userId", {
      type: "string",
      describe: "User ID",
    }),
  handler: async (argv) => {
    const { userId } = argv;

    const repository = new PrismaFleetRepository();

    const initializeFleet = new InitializeFleet(userId as string);
    const handler = new InitializeFleetHandler(repository);
    const fleetId = await handler.handle(initializeFleet);

    console.log(fleetId); // TODO: Add a sentence to successfully created fleet
  },
};
