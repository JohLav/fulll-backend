#!/usr/bin/env node
import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import chalk from "chalk";

import { createFleetCommand } from "./Primary/CLI/create.js";
import { registerVehicleCommand } from "./Primary/CLI/registerVehicleCommand.js";
import { updateLocationCommand } from "./Primary/CLI/updateLocationCommand.js";
import { localizeVehicleCommand } from "./Primary/CLI/localizeVehicleCommand.js";

const logo = chalk.black.bold(`
███████╗██╗  ██╗██╗     ██╗     ██╗     ██╗     
██╔════╝██║  ██║██║     ██║     ██║     ██║     
█████╗  ██║  ██║██║     ██║     ██║     ██║     
██╔══╝  ██║  ██║██║     ██║     ██║     ██║     
██║     ███████║███████╗███████╗███████╗███████╗
╚═╝     ╚══════╝╚══════╝╚══════╝╚══════╝╚══════╝

${chalk.white("Fleet Management CLI")}
`);

console.log(logo);

yargs(hideBin(process.argv))
  .scriptName(chalk.cyan("fleet"))
  .usage(chalk.green("Usage: npm run fleet <command> [options]"))
  .command(createFleetCommand)
  .command(registerVehicleCommand)
  .command(updateLocationCommand)
  .command(localizeVehicleCommand)
  .showHelpOnFail(true)
  .strict()
  .demandCommand(1, "Please provide a valid command.")
  .wrap(150)
  .parse();
