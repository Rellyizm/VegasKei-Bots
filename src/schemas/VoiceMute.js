const { Schema, model } = require("mongoose");

const schema = Schema({
  guildID: { type: String, default: ""},
  cezaID: Number,
  userID: { type: String, default: ""},
  authorID: { type: String, default: ""},
  time: {type: String, default: "-"},
  timems: {type: Number, default: 0},
  date: {type: Number, default: Date.now()},
  finishDate: {type: Number, default: 0},
  Reason: String,
});

module.exports = model("voicemute", schema);