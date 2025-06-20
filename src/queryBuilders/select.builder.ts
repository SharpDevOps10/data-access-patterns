import { WhereCondition } from './where-condition.type';

export class SelectBuilder {
  private readonly table: string;
  private fields: string[] = ['*'];
  private whereConditions: WhereCondition = {};
  private orderField: string | null = null;
  private limitCount: number | null = null;

  constructor (table: string) {
    this.table = table;
  }

  selectColumns (fields: string[]): this {
    this.fields = fields;
    return this;
  }

  where (conditions: WhereCondition): this {
    Object.assign(this.whereConditions, conditions);
    return this;
  }

  order (field: string): this {
    this.orderField = field;
    return this;
  }

  limit (count: number): this {
    this.limitCount = count;
    return this;
  }

  build (): string {
    const whereClause = Object.entries(this.whereConditions)
      .map(([key, val]) => `${ key } = '${ val }'`)
      .join(' AND ');

    const sql = [
      `SELECT ${ this.fields.join(', ') }`,
      `FROM ${ this.table }`,
      whereClause ? `WHERE ${ whereClause }` : '',
      this.orderField ? `ORDER BY ${ this.orderField }` : '',
      this.limitCount !== null ? `LIMIT ${ this.limitCount }` : '',
    ].filter(Boolean).join(' ');

    return sql.trim();
  }
}
