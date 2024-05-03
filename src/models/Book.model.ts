import Database from "bun:sqlite";
import type { Book } from "../entities/Book";

class BookModel {
  db: Database;

  constructor() {
    this.db = new Database("./bun_api.sqlite");
    this.createTable();
  }

  public async deleteAll(): Promise<void> {
    let query = this.db.prepare("DELETE FROM books;");
    await query.run();

    let query2 = this.db.prepare(
      "DELETE FROM sqlite_sequence WHERE name = 'books';"
    );
    await query2.run();

    return Promise.resolve();
  }

  public async all(): Promise<Book[]> {
    const query = this.db.prepare("SELECT * FROM books;");
    const rows = await (<Book[]>query.all());

    return rows;
  }

  public async create(book: Partial<Book>): Promise<Number> {
    if (!book.title || !book.author)
      throw new Error("Please provide valid title and author.");

    const query = this.db.prepare(
      "INSERT INTO books (title, author) VALUES (?, ?);"
    );
    await query.run(book.title, book.author);

    const last_insert_rowid = this.db.query(
      "SELECT last_insert_rowid() as id;"
    );
    const result_id = await (<{ id: number }>last_insert_rowid.get());

    console.log(result_id);

    return result_id.id;
  }

  public async read(id: number): Promise<Book | null> {
    const query = this.db.prepare("SELECT * FROM books WHERE id = ?;");
    const row = await (<Book>query.get(id));

    if (!row) {
      return null;
    }

    return row;
  }

  public async update(book: Book): Promise<Book> {
    const query = this.db.prepare(
      "UPDATE books SET title = ?, author = ? WHERE id = ?;"
    );
    await query.run(book.title, book.author, book.id);

    return book;
  }

  public async delete(id: number): Promise<void> {
    const query = this.db.prepare("DELETE FROM books WHERE id = ?;");
    await query.run(id);

    return Promise.resolve();
  }

  private async createTable() {
    const query = this.db.prepare(
      `CREATE TABLE IF NOT EXISTS books (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        author TEXT NOT NULL
      );`
    );
    await query.run();
  }
}

export { BookModel };

