const { Schema, model } = require("mongoose");

const schema = Schema({
  guildID: { type: String, default: ""},
  userID: { type: String, default: ""},
  kayıtlar: {type: Array, default: []},
  tagaldı: {type: Array, default: []},
  haftalıkkayıt: {type: Array, default: 0},
  tagaldıtotal: {type: Number, default: 0},
  erkekkayıt: {type: Number, default: 0},
  kızkayıt: {type: Number, default: 0},
  fakekayıt: {type: Number, default: 0},
  toplamkayıt: {type: Number, default: 0},
  ban: {type: Number, default: 0},
  banlimit: {type: Number, default: 0},
  jail: {type: Number, default: 0},
  jaillmit: {type: Number, default: 0},
  chatmute: {type: Number, default: 0},
  voicemute: {type: Number, default: 0},
});

module.exports = model("yetkilicommandssayı", schema);