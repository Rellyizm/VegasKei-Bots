const { Schema, model } = require("mongoose");

const schema = Schema({
  guildID: { type: String, default: ""},
  userID: { type: String, default: ""},
  ban: {type: Number, default: 0},
  jail: {type: Number, default: 0},
  chatmute: {type: Number, default: 0},
  voicemute: {type: Number, default: 0},
});

module.exports = model("cezasayı", schema);