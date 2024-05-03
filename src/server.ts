import express from "express";

import { bookRouter } from "./routes/Book.route";
import { readerRouter } from "./routes/Reader.route";

const PORT = 3000;

const app = express();

// Permet de parser les données JSON dans le corps de la requête et les rend disponibles dans req.body.
app.use(express.json());
// Permet de parser les données URL-encoded dans le corps de la requête et les rend disponibles dans req.body.
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Hello via Bun, je suis une API !");
});

// app.all("*", tokenMiddleware);

// Ici, nous ajoutons le middleware uniquement aux routes qui commencent par /readers.
// app.use("/readers", tokenMiddleware, readerRouter);

app.use("/readers", readerRouter);
app.use("/books", bookRouter);

app.listen(PORT, () => {
  console.log(`Server started listening on: http://127.0.0.1:${PORT}`);
});

