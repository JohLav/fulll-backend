#!/usr/bin/env node
import yargs from "yargs";
import { hideBin } from "yargs/helpers";

import { createFleetCommand } from "./Primary/CLI/create.js";
import { registerVehicleCommand } from "./Primary/CLI/registerVehicleCommand.js";
import { localizeVehicleCommand } from "./Primary/CLI/localizeVehicleCommand.js";

yargs(hideBin(process.argv))
  .command(createFleetCommand)
  .command(registerVehicleCommand)
  .command(localizeVehicleCommand)
  .strict()
  .demandCommand()
  .help()
  .parse();
