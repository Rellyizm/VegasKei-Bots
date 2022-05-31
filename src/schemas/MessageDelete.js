const { Schema, model } = require("mongoose");

const schema = Schema({
  guildID: { type: String, default: ""},
  channelID: { type: String, default: ""},
  msg: { type: Array, default: []},
});

module.exports = model("msgdelete", schema);