const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CardSchema = new Schema({
  _id: Schema.Types.ObjectId,
  user: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  number: {
    type: Number,
    required: true
  },
  isCredit: {
    type: Boolean,
    default: false
  },
  expires: {
    type: Date,
    required: true
  },
  billingCycle: {
    type: Date
  },
  receipts: [{ type: Schema.Types.ObjectId, ref: "Receipt"}]
})

module.exports = Card = mongoose.model("Card", CardSchema);