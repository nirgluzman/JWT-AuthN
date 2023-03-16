require("colors");
require("dotenv").config();

const express = require("express");

const PORT = process.env.PORT || 3000;

// Users database - for testing.
const users = [];

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome to AuthN Tutorial !");
});

app.get("/users", (req, res) => {
  res.json(users);
});

app.post("/users", (req, res) => {
  const user = { name: req.body.name, password: req.body.password };
  users.push(user);
  res.status(201).send();
});

app.listen(PORT, () => {
  console.log(`Listening on http://localhost:${PORT}`.red);
});
