import Database from "bun:sqlite";
import type { Token } from "../entities/Token";

class TokenModel {
  db: Database;

  constructor() {
    this.db = new Database("./bun_api.sqlite");
    this.createTable();
  }

  public async deleteAll(): Promise<void> {
    let query = this.db.prepare("DELETE FROM tokens;");
    await query.run();

    let query2 = this.db.prepare(
      "DELETE FROM sqlite_sequence WHERE name = 'tokens';"
    );
    await query2.run();

    return Promise.resolve();
  }

  public async create(token: string): Promise<Number> {
    if (!token) throw new Error("Please provide valid token.");

    const query = this.db.prepare("INSERT INTO tokens (token) VALUES (?);");
    await query.run(token);

    const last_insert_rowid = this.db.query(
      "SELECT last_insert_rowid() as id;"
    );
    const result_id = await (<{ id: number }>last_insert_rowid.get());

    console.log(typeof result_id.id);

    return result_id.id;
  }

  public async find(token: string): Promise<boolean> {
    const query = this.db.prepare("SELECT * FROM tokens WHERE token = ?;");
    const row = await (<Token>query.get(token));

    if (!row) {
      return false;
    }

    return true;
  }

  private async createTable() {
    const query = this.db.prepare(
      `CREATE TABLE IF NOT EXISTS tokens (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        token TEXT NOT NULL,
      );`
    );
    await query.run();
  }
}

export { TokenModel };

