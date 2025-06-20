import { WhereCondition } from './where-condition.type';

export class UpdateBuilder {
  private readonly table: string;
  private updates: Record<string, any> = {};
  private whereConditions: WhereCondition = {};

  constructor (table: string) {
    this.table = table;
  }

  set (data: Record<string, any>): this {
    this.updates = data;
    return this;
  }

  where (conditions: WhereCondition): this {
    Object.assign(this.whereConditions, conditions);
    return this;
  }

  build (): string {
    const setClause = Object.entries(this.updates)
      .map(([key, val]) => `${ key } = '${ val }'`)
      .join(', ');

    const whereClause = Object.entries(this.whereConditions)
      .map(([key, val]) => `${ key } = '${ val }'`)
      .join(' AND ');

    return `UPDATE ${ this.table }
            SET ${ setClause }
            WHERE ${ whereClause }
            RETURNING *;`;
  }
}
