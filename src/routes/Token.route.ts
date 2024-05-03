import express from "express";
import { TokenModel } from "../models/Token.model";

const tokenRouter = express.Router();

tokenRouter.post("/", async (req, res) => {
  const token = <string>req.body.token;

  console.log(token);

  const tokenModel = new TokenModel();
  const id = await tokenModel.create(token);

  return res.json(token);
});

tokenRouter.post("/authenticate", async (req, res) => {
  const token = <string>req.body.token;

  const tokenModel = new TokenModel();

  const tokenExists = await tokenModel.find(token);

  if (!tokenExists) return res.status(404).send("This tokens is not valid");

  return res.json("This token is valid");
});

export { tokenRouter };

