const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ReceiptSchema = new Schema({
  card: {
    type: Schema.Types.ObjectId,
    ref: "Card"
  },
  name: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  amount: {
    type: Schema.Types.Decimal128,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
})

module.exports = Receipt = mongoose.model("Receipt", ReceiptSchema);