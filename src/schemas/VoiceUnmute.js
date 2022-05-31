const { Schema, model } = require("mongoose");

const schema = Schema({
  guildID: { type: String, default: ""},
  userID: { type: String, default: ""},
  authorID: { type: String, default: ""},
  unmutedurum: { type: String, default: ""},
});

module.exports = model("voiceunmute", schema);