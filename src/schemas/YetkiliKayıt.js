const { Schema, model } = require("mongoose");

const schema = Schema({
  guildID: { type: String, default: ""},
  authorID: {type: String, default: ""},
  userID: { type: String, default: ""},
  mod: { type: Boolean, default: false},
});

module.exports = model("yetkilikayıt", schema);