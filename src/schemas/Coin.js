const { Schema, model } = require("mongoose");

const schema = Schema({
  guildID: { type: String, default: "" },
  userID: { type: String, default: "" },
  Coin: { type: Number, default: 0 },
  coinDaily: {type: Number, default: 0},
  coinMonth: {type: Number, default: 0},
  coinWeek: { type: Number, default: 0 },
  dailyDate: {type: Number, default: 0},
  dailyCoin: {type: Number, default: 0},
  totalDailyCoin: {type: Number, default: 0},
  günCount: {type: Number, default: 0},
  cookieCount: {type: Number, default: 0},
  alınanÜrünler: {type: Array, default: []},
  tag: { type: Number, default: 0 },
  kayıt: { type: Number, default: 0 },
  msgCoin: { type: Number, default: 0 },
  kayıtCoin: { type: Number, default: 0 },
  publicCoin: { type: Number, default: 0 },
  streamerCoin: { type: Number, default: 0 },
  registerCoin: { type: Number, default: 0 },
  solvingCoin: { type: Number, default: 0 },
  funCoin: { type: Number, default: 0 },
  privateCoin: { type: Number, default: 0 },
  aloneCoin: { type: Number, default: 0 },
  tagCoin: { type: Number, default: 0 }
});

module.exports = model("coinsystem", schema);