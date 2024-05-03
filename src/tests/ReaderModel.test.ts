import { beforeAll, expect, test } from "bun:test";
import { ReaderModel } from "../models/ReaderModel";

beforeAll(async () => {
  // Clear the database
  const readerModel = new ReaderModel();
  await readerModel.deleteAll();
});

test("all", async () => {
  const readerModel = new ReaderModel();
  const readers = await readerModel.all();

  expect(readers).toBeInstanceOf(Array);
});

test("create", async () => {
  const readerModel = new ReaderModel();
  const id = await readerModel.create({
    firstName: "Valentin",
    lastName: "Brosseau",
  });

  expect(id).toBeGreaterThan(0);
});

test("read", async () => {
  const readerModel = new ReaderModel();
  const reader = await readerModel.read(1);

  expect(reader!.id).toBe(1);
  expect(reader!.firstName).toBe("Valentin");
  expect(reader!.lastName).toBe("Brosseau");
});

test("update", async () => {
  const readerModel = new ReaderModel();
  const reader = await readerModel.update({
    id: 1,
    firstName: "Valentin",
    lastName: "Brosseau 2",
  });

  expect(reader.id).toBe(1);
  expect(reader.firstName).toBe("Valentin");
  expect(reader.lastName).toBe("Brosseau 2");
});

test("delete", async () => {
  const readerModel = new ReaderModel();
  await readerModel.delete(1);

  const reader = await readerModel.read(1);
  expect(reader).toBeNull();
});

