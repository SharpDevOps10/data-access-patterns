import { IUserDAO } from './user.dao.interface';
import { Pool } from 'pg';
import { UserRowDTO } from '../dto/user-raw.dto';
import { UserInsertDTO } from '../dto/user-insert.dto';
import { UserUpdateDTO } from '../dto/user-update.dto';

export class UserDAO implements IUserDAO {
  constructor (private readonly pool: Pool) {}

  async findById (id: string): Promise<UserRowDTO | null> {
    const res = await this.pool.query<UserRowDTO>(
      'SELECT * FROM users WHERE id = $1',
      [id],
    );
    return res.rows[0] ?? null;
  }

  async insert (data: UserInsertDTO): Promise<UserRowDTO> {
    const res = await this.pool.query<UserRowDTO>(
      'INSERT INTO users (name) VALUES ($1) RETURNING id, name',
      [data.name],
    );
    return res.rows[0];
  }

  async update (data: UserUpdateDTO): Promise<UserRowDTO> {
    const res = await this.pool.query<UserRowDTO>(
      'UPDATE users SET name = $1 WHERE id = $2 RETURNING id, name',
      [data.name, data.id],
    );
    return res.rows[0];
  }

  async delete (id: string): Promise<void> {
    await this.pool.query('DELETE FROM users WHERE id = $1', [id]);
  }
}
