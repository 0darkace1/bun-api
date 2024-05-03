import express from "express";

const PORT = 3000;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Hello via Bun, je suis une API !");
});

app.get("/hello/:name", (req, res) => {
  res.send(`Hello via Bun,  ${req.params.name}!`);
});

app.listen(PORT, () => {
  console.log(`Server started listening on: http://127.0.0.1:${PORT}`);
});

