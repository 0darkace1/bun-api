import express from "express";
import { BookModel } from "../models/Book.model.ts";

const bookRouter = express.Router();

bookRouter.get("/", async (req, res) => {
  const readerModel = new BookModel();
  const readers = await readerModel.all();

  res.send(readers);
});

bookRouter.post("/", async (req, res) => {
  const readerModel = new BookModel();
  const id = await readerModel.create(req.body);

  res.send({
    id: id,
  });
});

bookRouter.get("/:id", async (req, res) => {
  const readerModel = new BookModel();
  const book = await readerModel.read(parseInt(req.params.id));

  if (!book) {
    res.status(404).send("Book not found");
    return;
  }

  res.send(book);
});

bookRouter.put("/:id", async (req, res) => {
  if (!req.params.id) res.status(401).send("Please provide valid id");

  const readerModel = new BookModel();
  const book = await readerModel.read(parseInt(req.params.id));

  if (!book) {
    res.status(404).send("Book not found");
    return;
  }

  await readerModel.update({
    id: book.id,
    title: req.body.firstName,
    author: req.body.lastName,
  });

  res.send(book);
});

bookRouter.delete("/:id", async (req, res) => {
  const readerModel = new BookModel();
  const book = await readerModel.read(parseInt(req.params.id));

  if (!book) {
    res.status(404).send("Book not found");
    return;
  }

  await readerModel.delete(book.id);

  res.send(book);
});

export { bookRouter };

