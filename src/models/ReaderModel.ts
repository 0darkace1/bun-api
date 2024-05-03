// ReaderModel.ts
import { Database } from "bun:sqlite";
import { Reader } from "../entities/Reader.ts";

class ReaderModel {
  db: Database;

  constructor() {
    this.db = new Database("../bun_api.sqlite");
    this.createTable();
  }

  public async deleteAll(): Promise<void> {
    let query = this.db.prepare("DELETE FROM readers;");
    query.run();

    let query2 = this.db.prepare(
      "DELETE FROM sqlite_sequence WHERE name = 'readers';"
    );
    query2.run();

    return Promise.resolve();
  }

  public async all(): Promise<Reader[]> {
    const query = this.db.prepare("SELECT * FROM readers;");
    const rows = await (<Reader[]>query.all());

    return rows;
  }

  public async create(reader: Partial<Reader>): Promise<Number> {
    if (!reader.firstName || !reader.lastName)
      throw new Error("Please provide valid firstName and lastName.");

    const query = this.db.prepare(
      "INSERT INTO readers (firstName, lastName) VALUES (?, ?);"
    );
    await query.run(reader.firstName, reader.lastName);

    const last_insert_rowid = this.db.query(
      "SELECT last_insert_rowid() as id;"
    );
    const result_id = await (<{ id: number }>last_insert_rowid.get());

    console.log(result_id);

    return result_id.id;
  }

  public async read(id: number): Promise<Reader | null> {
    const query = this.db.prepare("SELECT * FROM readers WHERE id = ?;");
    const row = await (<Reader>query.get(id));

    if (!row) {
      return null;
    }

    return row;
  }

  public async update(reader: Reader): Promise<Reader> {
    const query = this.db.prepare(
      "UPDATE readers SET firstName = ?, lastName = ? WHERE id = ?;"
    );
    await query.run(reader.firstName, reader.lastName, reader.id);

    return reader;
  }

  public async delete(id: number): Promise<void> {
    const query = this.db.prepare("DELETE FROM readers WHERE id = ?;");
    await query.run(id);

    return Promise.resolve();
  }

  private async createTable() {
    const query = this.db.prepare(
      `CREATE TABLE IF NOT EXISTS readers (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        firstName TEXT NOT NULL,
        lastName TEXT NOT NULL
      );`
    );
    await query.run();
  }
}

export { ReaderModel };

