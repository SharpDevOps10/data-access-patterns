import pool from '../db/connection';
import { UserActiveRecord } from './user.model';

/*
Active Record embeds DB logic directly in the entity class.
Pros: fast implementation
Cons: mixes concerns, harder to test, doesn’t scale well for complex domains.
*/

const main = async () => {
  const newUser = await UserActiveRecord.create('Marcus');
  console.log('Created:', newUser);

  const found = await UserActiveRecord.findById(newUser.id!);
  console.log('Found:', found);

  if (found) {
    found.name = 'Commodus';
    const updated = await found.update();
    console.log('Updated:', updated);

    await updated.delete();
    console.log('Deleted:', updated);
  }
};

main()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(() => {
    void pool.end();
  });
