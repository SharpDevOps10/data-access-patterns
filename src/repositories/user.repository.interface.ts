import { User } from '../entities/user';

export interface IUserRepository {
  findById(id: string): Promise<User>;
  save(user: User): Promise<User>;
  update(user: User): Promise<User>;
  delete(id: string): Promise<User>;
}
