require("colors");
require("dotenv").config();

const express = require("express");

const bcrypt = require("bcrypt");

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

app.post("/users", async (req, res) => {
  try {
    // create password salting.
    const salt = await bcrypt.genSalt();

    // bcrypt prepends the salt to hashedPassword (adds on at the beginning).
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    console.log(salt);
    console.log(hashedPassword);

    const user = { name: req.body.name, password: hashedPassword };
    users.push(user);
    res.status(201).send();
  } catch (err) {
    console.log(err);
    res.status(500).send();
  }
});

app.listen(PORT, () => {
  console.log(`Listening on http://localhost:${PORT}`.red);
});
