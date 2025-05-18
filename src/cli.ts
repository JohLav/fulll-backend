#!/usr/bin/env node
import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import chalk from "chalk";

import { createFleetCommand } from "./Infra/Primary/CLI/create";
import { registerVehicleCommand } from "./Infra/Primary/CLI/registerVehicleCommand";
import { updateLocationCommand } from "./Infra/Primary/CLI/updateLocationCommand";
import { localizeVehicleCommand } from "./Infra/Primary/CLI/localizeVehicleCommand";

const rawArgs = hideBin(process.argv);

// Show the banner only if `--help` is explicitly requested or no args are passed
const showBanner = rawArgs.includes("--help") || rawArgs.length === 0;

if (showBanner) {
  const logo = chalk.black.bold(`
███████╗██╗  ██╗██╗     ██╗     ██╗     
██╔════╝██║  ██║██║     ██║     ██║     
█████╗  ██║  ██║██║     ██║     ██║     
██╔══╝  ██║  ██║██║     ██║     ██║     
██║     ███████║███████╗███████╗███████╗
╚═╝     ╚══════╝╚══════╝╚══════╝╚══════╝

${chalk.white("Fleet Management CLI")}
`);

  console.log(logo);
}

yargs(rawArgs)
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
