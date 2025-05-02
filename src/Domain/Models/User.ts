export class User {
  constructor(public readonly id: string) {}

  static create(id: string): User {
    return new User(id);
  }
}
