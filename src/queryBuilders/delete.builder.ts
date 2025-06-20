import { WhereCondition } from './where-condition.type';

export class DeleteBuilder {
  private readonly table: string;
  private whereConditions: WhereCondition = {};

  constructor (table: string) {
    this.table = table;
  }

  where (conditions: WhereCondition): this {
    Object.assign(this.whereConditions, conditions);
    return this;
  }

  build (): string {
    const whereClause = Object.entries(this.whereConditions)
      .map(([key, val]) => `${key} = '${val}'`)
      .join(' AND ');

    return `DELETE FROM ${this.table} WHERE ${whereClause};`;
  }
}
