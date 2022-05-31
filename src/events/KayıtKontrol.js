const cfg = require("../configs/config.json");
const client = global.client;
const YetkiliKayıtDatabase = require("../schemas/YetkiliKayıt");

module.exports = async () => {

  setInterval(async() => {
  YetkiliKayıtDatabase.find({mod: true}, async(err, kayıtData) => {
  if ((!kayıtData) || (kayıtData.length < 1)) return null;
  for (var kayıtlar of kayıtData) {
  let StaffDatax2 = await YetkiliKayıtDatabase.findOne({ guildID: cfg.Server.GuildID, authorID: kayıtlar.authorID})
  StaffDatax2.delete();
  }})
  }, 15000);}

module.exports.conf = {
  name: "ready",
};
