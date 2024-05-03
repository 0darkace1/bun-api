import express from "express";

import { tokenMiddleware } from "./middlewares/Token.middleware";
import { bookRouter } from "./routes/Book.route";
import { readerRouter } from "./routes/Reader.route";
import { tokenRouter } from "./routes/Token.route";

const PORT = process.env.PORT || 3000;

const app = express();

// Permet de parser les données JSON dans le corps de la requête et les rend disponibles dans req.body.
app.use(express.json());
// Permet de parser les données URL-encoded dans le corps de la requête et les rend disponibles dans req.body.
app.use(express.urlencoded({ extended: true }));

// Message d'accueil
app.get("/", (req, res) => {
  res.send("Hello via Bun, je suis une API !");
});

app.use("/tokens", tokenRouter);
app.all("*", tokenMiddleware);

// Ici, nous ajoutons le middleware uniquement aux routes qui commencent par /readers.
// app.use("/readers", tokenMiddleware, readerRouter);

app.use("/readers", readerRouter);
app.use("/books", bookRouter);

app.listen(PORT, () => {
  console.log(`Server started listening on: http://127.0.0.1:${PORT}`);
});

