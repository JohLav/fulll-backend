import { randomUUID } from "node:crypto";

export class User {
  constructor(public readonly id: string) {}

  static create(): User {
    return new User(randomUUID());
  }
}
