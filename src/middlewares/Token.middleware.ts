import type { NextFunction, Request, Response } from "express";
import { TokenModel } from "../models/Token.model.ts";

const tokenModel = new TokenModel();

const tokenMiddleware = (req: Request, res: Response, next: NextFunction) => {
  // Nous allons ici vérifier que notre requête contient bien un token et que ce token est valide.
  // Si le token est valide, nous allons appeler la fonction next() pour passer à la suite.
  // Si le token n'est pas valide, nous allons retourner une erreur 401 (Unauthorized).

  // Vérifier que la requête contient bien un token
  if (!req.headers.authorization) {
    res.status(401).send("Unauthorized");
    return;
  }

  // Vérifier que le token est valide
  const token = req.headers.authorization.replace("Bearer ", "");
  const isValid = tokenModel.find(token);

  // Si le token n'est pas valide, nous retournons une erreur 401 (Unauthorized)
  if (!isValid) {
    res.status(401).send("Unauthorized");
    return;
  }

  // Si le token est valide, nous appelons la fonction next() pour passer à la suite.
  next();
};

export { tokenMiddleware };

