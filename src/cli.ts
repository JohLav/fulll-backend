#!/usr/bin/env node
import yargs from "yargs";
import { hideBin } from "yargs/helpers";

import { createFleetCommand } from "./Commands/create.js";
import { localizeVehicleCommand } from "./Commands/localizeVehicleCommand.js";
import { registerVehicleCommand } from "./Commands/registerVehicleCommand.js";

yargs(hideBin(process.argv))
  .command(createFleetCommand)
  .command(registerVehicleCommand)
  .command(localizeVehicleCommand)
  .demandCommand()
  .strict()
  .help()
  .parse();
