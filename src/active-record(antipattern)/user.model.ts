import pool from '../db/connection';
import { UserRowDTO } from '../dto/user-raw.dto';

/*
Active Record is an antipattern where domain entities directly handle their own persistence.
NOT FOR REAL APPLICATIONS!
*/

export class UserActiveRecord {
  id?: string;
  name: string;

  constructor (name: string, id?: string) {
    this.name = name;
    if (id) this.id = id;
  }

  static async create (name: string): Promise<UserActiveRecord> {
    const res = await pool.query<UserRowDTO>(
      'INSERT INTO users (name) VALUES ($1) RETURNING id, name',
      [name],
    );
    const row = res.rows[0];
    return new UserActiveRecord(row.name, row.id);
  }

  static async findById (id: string): Promise<UserActiveRecord | null> {
    const res = await pool.query<UserRowDTO>('SELECT id, name FROM users WHERE id = $1', [id]);
    if (res.rowCount === 0) return null;
    const row = res.rows[0];
    return new UserActiveRecord(row.name, row.id);
  }

  async update (): Promise<this> {
    if (!this.id) throw new Error('Cannot update user without ID');
    const res = await pool.query<UserRowDTO>(
      'UPDATE users SET name = $1 WHERE id = $2 RETURNING id, name',
      [this.name, this.id],
    );
    const row = res.rows[0];
    this.name = row.name;
    return this;
  }

  async delete (): Promise<void> {
    if (!this.id) throw new Error('Cannot delete user without ID');
    await pool.query('DELETE FROM users WHERE id = $1', [this.id]);
  }
}
