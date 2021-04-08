const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  _id: Schema.Types.ObjectId,
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  cards: [{ type: Schema.Types.ObjectId, ref: "Card"}]
})

module.exports = User = mongoose.model("User", UserSchema);