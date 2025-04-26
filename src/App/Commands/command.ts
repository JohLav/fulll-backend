export abstract class Command {}

export interface CommandHandler {
  handle(command: Command): void | string;
}
