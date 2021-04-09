const mongoose = require("mongoose");

const express = require("express");
const app = express();

const passport = require("passport");
require("./config/passport")(passport);

const db = require("./config/keys.js").mongoURI;

const users = require("./routes/users");
const cards = require("./routes/cards");
const receipts = require("./routes/receipts");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(passport.initialize());

app.use("/users", users);
app.use("/cards", cards);
app.use("/receipts", receipts);

mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB successfully"))
  .catch(err => console.log(err));

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server is running on port ${port}`));