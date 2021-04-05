const express = require("express");
const mongoose = require("mongoose");
const app = express();

app.get("/", (req, res) => res.send("Hello World"));

const db = require('./config/keys.js').mongoURI;

mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB successfully"))
  .catch(err => console.log(err));

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server is running on port ${port}`));