import { UserDAO } from './user.dao';
import pool from '../db/connection';
import { User } from '../entities/user';
import { IUserDAO } from './user.dao.interface';

/*
Direct DAO usage (no Repository).
Work directly with DB rows and convert to domain manually.
- Simpler setup
- Less abstraction
But:
- Business logic mixes with DB logic
- Leaks persistence structure
*/

const main = async () => {
  const dao: IUserDAO = new UserDAO(pool);

  const inserted = await dao.insert({ name: 'Marcus' });
  const user = new User(inserted.id, inserted.name);
  console.log('Created:', user);

  const foundRow = await dao.findById(user.id);
  if (!foundRow) throw new Error('User not found');
  const foundUser = new User(foundRow.id, foundRow.name);
  console.log('Found:', foundUser);

  const updatedRow = await dao.update({
    id: foundUser.id,
    name: 'Commodus',
  });
  const updatedUser = new User(updatedRow.id, updatedRow.name);
  console.log('Updated:', updatedUser);

  await dao.delete(updatedUser.id);
  console.log('Deleted:', updatedUser);
};

main()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(() => {
    void pool.end();
  });
