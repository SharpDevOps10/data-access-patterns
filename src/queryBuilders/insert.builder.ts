export class InsertBuilder {
  private readonly table: string;
  private data: Record<string, any> = {};

  constructor (table: string) {
    this.table = table;
  }

  values (data: Record<string, any>): this {
    this.data = data;
    return this;
  }

  build (): string {
    const keys = Object.keys(this.data);
    const values = keys.map((k) => `'${ this.data[k] }'`);

    return `INSERT INTO ${ this.table } (${ keys.join(', ') })
            VALUES (${ values.join(', ') })
            RETURNING *;`;
  }
}
