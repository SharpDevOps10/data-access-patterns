import { UserDAO } from '../dao/user.dao';
import pool from '../db/connection';
import { UserRepository } from './user.repository';
import { User } from '../entities/user';
import { IUserRepository } from './user.repository.interface';
import { IUserDAO } from '../dao/user.dao.interface';

/*
DAO handles raw DB operations.
Repository uses DAO and returns domain entities
it encapsulates persistence logic and decouples app from DB structure.
Pros: better separation, easier testing, domain-centric code.
Cons: adds a layer, might feel redundant for simple use cases.
*/

const main = async () => {
  const userDAO: IUserDAO = new UserDAO(pool);
  const userRepository: IUserRepository = new UserRepository(userDAO);

  const newUser = User.createUser('Marcus');
  const savedUser = await userRepository.save(newUser);
  console.log('Created:', savedUser);

  const found = await userRepository.findById(savedUser.id);
  console.log('Found:', found);

  found.name = 'Commodus';
  const updated = await userRepository.update(found);
  console.log('Updated:', updated);

  const deleted = await userRepository.delete(updated.id);
  console.log('Deleted:', deleted);
};

main()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(() => {
    void pool.end();
  });
