const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
const app = express();

const users = require("./routes/api/users");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(passport.initialize());
require("./config/passport")(passport);
app.use("/api/users", users);

const db = require("./config/keys.js").mongoURI;

mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB successfully"))
  .catch(err => console.log(err));

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server is running on port ${port}`));