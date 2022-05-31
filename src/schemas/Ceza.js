const { Schema, model } = require("mongoose");

const schema = Schema({
  guildID: { type: String, default: ""},
  authorID: { type: String, default: ""},
  chatmuted: { type: Boolean, default: false},
  ban: { type: Boolean, default: false},
  voicemuted: { type: Boolean, default: false},
  jail: { type: Boolean, default: false},
  jail3days: { type: Boolean, default: false},
  cezaID: Number,
  userID: { type: String, default: ""},
  time: {type: String, default: "-"},
  date: {type: Number, default: Date.now()},
  finishDate: {type: Number, default: 0},
  Reason: String,
  Type: String,
});

module.exports = model("ceza", schema);