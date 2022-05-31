const { Schema, model } = require("mongoose");

const schema = Schema({
  guildID: { type: String, default: ""},
  userID: { type: String, default: ""},
  afk: Object,
  streamer18: { type: Number, default: 0},
  rollog: { type: Array, default: []},
  rollogtotal: { type: Number, default: 0},
  tagaldı: { type: Boolean, default: false},
});

module.exports = model("general", schema);