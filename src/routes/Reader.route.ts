import express from "express";
import { ReaderModel } from "../models/Reader.model.ts";

const readerRouter = express.Router();

readerRouter.get("/", async (req, res) => {
  const readerModel = new ReaderModel();
  const readers = await readerModel.all();

  res.send(readers);
});

readerRouter.post("/", async (req, res) => {
  const readerModel = new ReaderModel();
  const id = await readerModel.create(req.body);

  res.send({
    id: id,
  });
});

readerRouter.get("/:id", async (req, res) => {
  const readerModel = new ReaderModel();
  const reader = await readerModel.read(parseInt(req.params.id));

  if (!reader) {
    res.status(404).send("Reader not found");
    return;
  }

  res.send(reader);
});

readerRouter.put("/:id", async (req, res) => {
  if (!req.params.id) res.status(401).send("Please provide valid id");

  const readerModel = new ReaderModel();
  const reader = await readerModel.read(parseInt(req.params.id));

  if (!reader) {
    res.status(404).send("Reader not found");
    return;
  }

  await readerModel.update({
    id: reader.id,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
  });

  res.send(reader);
});

readerRouter.delete("/:id", async (req, res) => {
  const readerModel = new ReaderModel();
  const reader = await readerModel.read(parseInt(req.params.id));

  if (!reader) {
    res.status(404).send("Reader not found");
    return;
  }

  await readerModel.delete(reader.id);

  res.send(reader);
});

export { readerRouter };

