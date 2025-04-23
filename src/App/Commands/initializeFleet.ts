interface Command {
}

export class InitializeFleet implements Command {
}

interface CommandHandler {
    handle(command: Command): void;
}

export class InitializeFleetHandler implements CommandHandler {
    handle(command: InitializeFleet) {
    }
}
