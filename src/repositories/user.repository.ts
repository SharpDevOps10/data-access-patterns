import { IUserDAO } from '../dao/user.dao.interface';
import { IUserRepository } from './user.repository.interface';
import { User } from '../entities/user';

export class UserRepository implements IUserRepository {
  constructor (private readonly dao: IUserDAO) {}

  async findById (id: string): Promise<User> {
    const row = await this.dao.findById(id);
    if (!row) throw new Error(`User with id "${id}" not found`);

    return new User(row.id, row.name);
  }

  async save (user: User): Promise<User> {
    const row = await this.dao.insert({ name: user.name });

    return new User(row.id, row.name);
  }

  async update (user: User): Promise<User> {
    const row = await this.dao.update({
      id: user.id,
      name: user.name,
    });

    return new User(row.id, row.name);
  }

  async delete (id: string): Promise<User> {
    const existing = await this.findById(id);
    await this.dao.delete(id);

    return existing;
  }
}
