require("colors");
require("dotenv").config();

const express = require("express");

const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome to AuthN Tutorial !");
});

app.listen(PORT, () => {
  console.log(`Listening on http://localhost:${PORT}`.red);
});
