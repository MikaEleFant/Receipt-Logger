const express = require("express");
const router = express.Router();
const passport = require("passport");

const Receipt = require("../models/Receipt");
const Card = require("../models/Card");
const validateReceiptInput = require("../validation/receipts");

router.get("/:card_id", 
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Receipt.find({card: req.params.card_id})
      .then(receipts => res.json(receipts))
      .catch(err => res.status(404).json(err))
});

router.post("/:card_id", 
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateReceiptInput(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    } else {
      const newReceipt = new Receipt({
        card: req.params.card_id,
        name: req.body.name,
        location: req.body.location,
        amount: req.body.amount,
        date: req.body.date
      });

      newReceipt.save().then(receipt => {
        Card.findByIdAndUpdate(
          {_id: req.params.card_id},
          {$push: {receipt: receipt.id}}
        )
        .then(card => res.json(receipt))
        .catch(err => res.status(400).json(err))
      })
    }
  }
);

router.delete(":receipt_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Receipt.findByIdAndDelete(req.params.receipt_id)
      .then(receipt => {
        Card.findByIdAndUpdate(
          {_id: receipt.card},
          {$pull: {receipts: receipt.id}}
        )
        .then(card => res.json(card))
        .catch(err => res.status(404).json(err));
      })
      .catch(err => res.status(404).json(err));
  }
);