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
    //const salt = await bcrypt.genSalt();

    // bcrypt prepends the salt to hashedPassword (adds on at the beginning).
    //const hashedPassword = await bcrypt.hash(req.body.password, salt);

    // bcrypt to salt and password hash in one command.
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    //console.log(salt);
    console.log(hashedPassword);

    const user = { name: req.body.name, password: hashedPassword };
    users.push(user);
    res.status(201).send();
  } catch (err) {
    console.log(err);
    res.status(500).send();
  }
});

app.post("/users/login", async (req, res) => {
  // check if user in database.
  const user = users.find((user) => user.name === req.body.name);
  if (user == null) {
    return res.status(400).send("cannot find user");
  }

  try {
    // compare plain text password and hashed password.
    if (await bcrypt.compare(req.body.password, user.password)) {
      res.send("success");
    } else {
      res.send("not allowed");
    }
  } catch (err) {
    console.log(err);
    res.status(500).send();
  }
});

app.listen(PORT, () => {
  console.log(`Listening on http://localhost:${PORT}`.red);
});
