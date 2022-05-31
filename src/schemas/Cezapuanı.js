const { Schema, model } = require("mongoose");

const schema = Schema({
  guildID: { type: String, default: ""},
  userID: { type: String, default: ""},
  cezapuanıban: {type: Number, default: ""},
  cezapuanıjail: {type: Number, default: ""},
  cezapuanıchatmute: {type: Number, default: ""},
  cezapuanıvoicemute: {type: Number, default: ""},
  cezapuanı250sınırceza: {type: Number, default: ""},
});

module.exports = model("cezapuanı", schema);