export abstract class Command {}

export interface CommandHandler {
  handle(command: Command): Promise<void | string>;
}
