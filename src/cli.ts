#!/usr/bin/env node
import yargs from "yargs";
import { hideBin } from "yargs/helpers";

import { createFleetCommand } from "./Commands/create.js";
import { registerVehicleCommand } from "./Commands/registerVehicleCommand.js";
import { localizeVehicleCommand } from "./Commands/localizeVehicleCommand.js";

yargs(hideBin(process.argv))
  .command(createFleetCommand)
  .command(registerVehicleCommand)
  .command(localizeVehicleCommand)
  .strict()
  .demandCommand()
  .help()
  .parse();
