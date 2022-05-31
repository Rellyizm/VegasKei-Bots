const { Schema, model } = require("mongoose");

const schema = Schema({
  guildID: { type: String, default: ""},
  yasaklıtag: {type: Array, default: []},
  haftalıkkayıt: {type: Number, default: 0},
  haftalıktaglı: {type: Number, default: 0},
  taglıalım: {type: String, default: "Kapalı"},
});

module.exports = model("control", schema);