const { Schema, model } = require("mongoose");

const schema = Schema({
  guildID: { type: String, default: "" },
  userID: { type: String, default: "" },
  puan: { type: Number, default: 0 },
  mod: { type: Boolean, default: false },
  tag: { type: Number, default: 0 },
  kayıt: { type: Number, default: 0 },
  msgPuan: { type: Number, default: 0 },
  kayıtPuan: { type: Number, default: 0 },
  publicPuan: { type: Number, default: 0 },
  registerPuan: { type: Number, default: 0 },
  solvingPuan: { type: Number, default: 0 },
  funPuan: { type: Number, default: 0 },
  privatePuan: { type: Number, default: 0 },
  alonePuan: { type: Number, default: 0 },
  kayıtPuan: { type: Number, default: 0 },
  tagPuan: { type: Number, default: 0 },
  tagEkPuan: { type: Number, default: 0 },
  kayıtEkPuan: { type: Number, default: 0 },
  inviteEkPuan: { type: Number, default: 0 },
  sesEkPuan: { type: Number, default: 0 },
  mesajEkPuan: { type: Number, default: 0 },
  ekPuanTotal: { type: Number, default: 0 },
});

module.exports = model("puan", schema);
