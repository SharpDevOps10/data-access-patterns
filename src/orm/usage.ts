import { PrismaClient } from '@prisma/client';
import { PrismaRepository } from './prisma.repository';
import { User } from '../entities/user';

const prisma = new PrismaClient();

const main = async () => {
  const repo = new PrismaRepository(prisma);

  const newUser = User.createUser('Marcus');
  const created = await repo.save(newUser);
  console.log('Created:', created);

  const found = await repo.findById(created.id);
  console.log('Found:', found);

  found.name = 'Commodus';
  const updated = await repo.update(found);
  console.log('Updated:', updated);

  await repo.delete(updated.id);
  console.log('Deleted:', updated);
};

void main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
