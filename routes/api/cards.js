const express = require("express");
const router = express.Router();
const passport = require("passport");
const jwt = require("jsonwebtoken");

const keys = require("../../config/keys");
const Card = require("../../models/Card");
const User = require("../../models/User");
const Receipt = require("../../models/Receipt");
const validateCardInput = require("../../validation/cards");

router.get("/user/:user_id", 
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Card.find({user: req.params.user_id})
      .then(cards => res.json(cards))
      .catch(err => res.status(404).json(err))
});

router.post("/newCard",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateCardInput(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }

    let newCard = new Card({
      user: req.user.id,
      number: req.body.number,
      isCredit: req.body.isCredit,
      expires: req.body.expires
    });

    if (req.body.billingCycle) {
      newCard.billingCycle = req.body.billingCycle;
    }

    newCard.save().then(card => res.json(card));
  }
);

router.delete("/:card_id", 
  passport.authenticate("jwt", {session: false }),
  (req, res) => {
    Card.findByIdAndDelete(req.params.card_id)
      .then(card => {
        Promise.all([
          User.findByIdAndUpdate(
            {_id: req.user.id},
            {cards: req.user.cards.filter(function(value, idx, arr) {
              return value !== card.id;
            })}
          ),
          Receipt.deleteMany({card: card.id})
        ]).then(([{errUser, user}, {errReceipt}]) => {
          if (errUser) {
            res.status(404).json(errUser);
          } 
          else if (errReceipt) {
            res.status(404).json(errReceipt);
          }
          else {
            const payload = {
              id: user.id,
              username: user.username
            };

            jwt.sign(payload, keys.secretOrKey, { expiresIn: 7200 }, (err, token) => {
              res.json({
                success: true,
                token: "Bearer " + token
              });
            });
          }
        })
      })
  }
)