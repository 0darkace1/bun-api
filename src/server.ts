import express from "express";

import { bookRouter } from "./routes/Book.route";
import { readerRouter } from "./routes/Reader.route";

const PORT = 3000;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Hello via Bun, je suis une API !");
});

app.use("/readers", readerRouter);
app.use("/books", bookRouter);

app.listen(PORT, () => {
  console.log(`Server started listening on: http://127.0.0.1:${PORT}`);
});

