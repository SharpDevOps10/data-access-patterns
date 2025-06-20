import { SQLBuilder } from './sql.builder';
import pool from '../db/connection';
import { User } from '../entities/user';
import { UserRowDTO } from '../dto/user-raw.dto';

/*
SQLBuilder uses fluent builders to generate raw SQL queries.
Pros: maximum flexibility, low-level control, can be used for dynamic or complex queries.
Cons: no domain abstraction, no validation, risk of SQL injection without parameter binding.
*/

const main = async () => {
  const insertSql = SQLBuilder.insert('users')
    .values({ name: 'Marcus' })
    .build();
  const insertRes = await pool.query<UserRowDTO>(insertSql);
  const insertedUser = new User(insertRes.rows[0].id, insertRes.rows[0].name);
  console.log('Created:', insertedUser);

  const selectSql = SQLBuilder.select('users')
    .where({ id: insertedUser.id })
    .build();
  const foundRes = await pool.query<UserRowDTO>(selectSql);
  const foundUser = new User(foundRes.rows[0].id, foundRes.rows[0].name);
  console.log('Found:', foundUser);

  const updateSql = SQLBuilder.update('users')
    .set({ name: 'Commodus' })
    .where({ id: foundUser.id })
    .build();
  const updateRes = await pool.query<UserRowDTO>(updateSql);
  const updatedUser = new User(updateRes.rows[0].id, updateRes.rows[0].name);
  console.log('Updated:', updatedUser);

  const deleteSql = SQLBuilder.delete('users')
    .where({ id: updatedUser.id })
    .build();
  await pool.query(deleteSql);
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
