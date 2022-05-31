const client = global.client;
const cfg = require("../configs/config.json");
const CezaDatabase = require("../schemas/Ceza");

module.exports = async () => {
  const invites = await client.guilds.cache.get(cfg.Server.GuildID).fetchInvites();
  client.invites.set(cfg.Server.GuildID, invites);
  console.log(`Sunucu davetleri tanımlandı!`)
  
  client.user.setPresence({ activity: { name: cfg.Bot.Durum, type: "WATCHING" }, status: cfg.Bot.Status })
  let VoiceChannelID = client.channels.cache.get(cfg.Channels.VoiceChannelID)
  if (VoiceChannelID) VoiceChannelID.join().catch(() => {})
  let count = await CezaDatabase.countDocuments().exec();
  console.log(`(${client.user.username}) adlı hesapta [${client.guilds.cache.get(cfg.Server.GuildID).name}] adlı sunucuda giriş yapıldı. ✔${count ? `\n${count} adet ceza tanımlandı! ✔` : ``}`)}

module.exports.conf = {
  name: "ready",
};
