export class User {
  constructor (
    public readonly id: string,
    public name: string,
  ) {}

  static createUser (name: string): User {
    return new User('', name);
  }
}
