export interface Command {}

export interface CommandHandler {
  handle(command: Command): void | string;
}
