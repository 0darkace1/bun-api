import { beforeAll, expect, test } from "bun:test";
import { TokenModel } from "../models/Token.model.ts";

beforeAll(async () => {
  // Clear the database
  const tokenModel = new TokenModel();
  await tokenModel.deleteAll();
});

test("create", async () => {
  const tokenModel = new TokenModel();
  const id = await tokenModel.create("f47ac10b-58cc-4372-a567-0e02b2c3d479");

  expect(id).toBeNumber();
});

test("read", async () => {
  const tokenModel = new TokenModel();
  const token = await tokenModel.find("f47ac10b-58cc-4372-a567-0e02b2c3d479");

  expect(token).toBeTrue();
});

