#!/usr/bin/env node
import yargs from "yargs";
import { hideBin } from "yargs/helpers";

import { createFleetCommand } from "./Commands/create.js";
// import { registerVehicleCommand } from "./commands/registerVehicle";
// import { localizeVehicleCommand } from "./commands/localizeVehicle";

yargs(hideBin(process.argv))
  .command(createFleetCommand)
  // .command(registerVehicleCommand)
  // .command(localizeVehicleCommand)
  .demandCommand()
  .strict()
  .help()
  .parse();
