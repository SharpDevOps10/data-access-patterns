import { PrismaClient } from '@prisma/client';
import { User } from '../entities/user';
import { IUserRepository } from '../repositories/user.repository.interface';

export class PrismaRepository implements IUserRepository {
  constructor (private prisma: PrismaClient) {}

  async findById (id: string): Promise<User> {
    const row = await this.prisma.user.findUnique({ where: { id } });
    if (!row) throw new Error(`User with id "${id}" not found`);

    return new User(row.id, row.name);
  }

  async save (user: User): Promise<User> {
    const row = await this.prisma.user.create({
      data: { name: user.name },
    });
    return new User(row.id, row.name);
  }

  async update (user: User): Promise<User> {
    const row = await this.prisma.user.update({
      where: { id: user.id },
      data: { name: user.name },
    });
    return new User(row.id, row.name);
  }

  async delete (id: string): Promise<User> {
    const row = await this.prisma.user.delete({
      where: { id },
    });
    return new User(row.id, row.name);
  }
}
