import { SelectBuilder } from './select.builder';
import { InsertBuilder } from './insert.builder';
import { UpdateBuilder } from './update.builder';
import { DeleteBuilder } from './delete.builder';

export class SQLBuilder {
  static select (table: string): SelectBuilder {
    return new SelectBuilder(table);
  }

  static insert (table: string): InsertBuilder {
    return new InsertBuilder(table);
  }

  static update (table: string): UpdateBuilder {
    return new UpdateBuilder(table);
  }

  static delete (table: string): DeleteBuilder {
    return new DeleteBuilder(table);
  }
}
