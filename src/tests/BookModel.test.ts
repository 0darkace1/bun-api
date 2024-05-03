import { beforeAll, expect, test } from "bun:test";
import { BookModel } from "../models/BookModel.ts";

beforeAll(async () => {
  // Clear the database
  const bookModel = new BookModel();
  await bookModel.deleteAll();
});

test("all", async () => {
  const bookModel = new BookModel();
  const books = await bookModel.all();

  expect(books).toBeInstanceOf(Array);
});

test("create", async () => {
  const bookModel = new BookModel();
  const id = await bookModel.create({
    title: "Mon livre",
    author: "Valentin Brosseau",
  });

  expect(id).toBeGreaterThan(0);
});

test("read", async () => {
  const bookModel = new BookModel();
  const book = await bookModel.read(1);

  expect(book.id).toBe(1);
  expect(book.title).toBe("Mon livre");
  expect(book.author).toBe("Valentin Brosseau");
});

test("update", async () => {
  const bookModel = new BookModel();
  const book = await bookModel.update({
    id: 1,
    title: "Mon livre",
    author: "Valentin Brosseau 2",
  });
});

test("delete", async () => {
  const bookModel = new BookModel();
  await bookModel.delete(1);

  const book = await bookModel.read(1);
  expect(book).toBeNull();
});
