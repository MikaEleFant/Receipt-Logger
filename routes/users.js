const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const passport = require("passport");

const keys = require("../config/keys");
const User = require("../models/User");

const validateRegisterInput = require("../validation/register");
const validateLoginInput = require("../validation/login");

router.get("/current", passport.authenticate("jwt", {session: false}), (req, res) => {
  res.json({
    id: req.user.id,
    username: req.user.username
  });
})

router.post("/register", (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({ username: req.body.username }).then(user => {
    if (user) {
      errors.username = "A user with that username already exists.";
      return res.status(409).json(errors);
    } else {
      const newUser = new User({
        username: req.body.username,
        password: req.body.password,
        cards: []
      });

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser.save()
            .then(user => {
              const payload = { id: user.id, username: user.username };

              jwt.sign(payload, keys.secretOrKey, { expiresIn: 7200 }, (err, token) => {
                res.json({
                  success: true,
                  token: "Bearer " + token
                });
              });
            })
            .catch(err => res.status(500).json(err));
        });
      });
    }
  });
});

router.post("/login", (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  const username = req.body.username;
  const password = req.body.password;

  User.findOne({ username }).then(user => {
    if (!user) {
      errors.username = "Incorrect username and/or password.";
      return res.status(400).json(errors);
    }

    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        const payload = { id: user.id, username: user.username };

        jwt.sign(payload, keys.secretOrKey, { expiresIn: 7200 }, (err, token) => {
          res.json({
            success: true,
            token: "Bearer " + token
          });
        });
      } else {
        errors.password = "Incorrect username and/or password.";
        return res.status(400).json(errors);
      }
    });
  });
});

module.exports = router;