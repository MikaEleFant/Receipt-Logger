const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CardSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  isCredit: {
    type: Boolean,
    required: true
  },
  number: {
    type: Number,
    required: true
  },
  expires: {
    type: Date,
    index: { expires: "60 days" },
  },
  billingCycle: {
    type: Date,
    default: "1111-11-11"
  },
  receipts: [{ type: Schema.Types.ObjectId, ref: "Receipt"}]
})

module.exports = Card = mongoose.model("Card", CardSchema);