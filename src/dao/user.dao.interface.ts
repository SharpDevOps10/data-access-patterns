import { UserRowDTO } from '../dto/user-raw.dto';
import { UserInsertDTO } from '../dto/user-insert.dto';
import { UserUpdateDTO } from '../dto/user-update.dto';

export interface IUserDAO {
  findById(id: string): Promise<UserRowDTO | null>;
  insert(data: UserInsertDTO): Promise<UserRowDTO>;
  update(data: UserUpdateDTO): Promise<UserRowDTO>;
  delete(id: string): Promise<void>;
}
