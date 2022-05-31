const cfg = require("../configs/config.json");
const { MessageEmbed } = require("discord.js");
const moment = require("moment");
const client = global.client;
const StaffDatabase = require("../schemas/Yetkili");
const ControlsDatabase = require("../schemas/Controls");

module.exports = async () => {

  setInterval(async() => {
  let StaffData = await StaffDatabase.findOne({ guildID: cfg.Server.GuildID})
  await StaffDatabase.findOneAndUpdate({ guildID: cfg.Server.GuildID}, { $set: { banlimit: 0 } }, { upsert: true });
  }, 1000*60*30);
  
  setInterval(async() => {
  let YasaklıTagData = await ControlsDatabase.findOne({ guildID: cfg.Server.GuildID})
  let yasakTaglar = YasaklıTagData && YasaklıTagData.yasaklıtag;
  if(!yasakTaglar) return
  client.guilds.cache.get(cfg.Server.GuildID).members.cache.filter(uye =>  !uye.user.bot && !uye.roles.cache.has(cfg.Roles.YasaklıTagRolü) && yasakTaglar.some(tag => uye.user.tag.includes(tag))).array().forEach(async(uye, index) => {
  uye.roles.cache.has(cfg.Roles.BoosterRolü) ?  uye.roles.set([cfg.Roles.BoosterRolü, cfg.Roles.YasaklıTagRolü]) : uye.roles.set([cfg.Roles.YasaklıTagRolü]);
  if (uye.voice.channel) uye.voice.kick();})
  }, 1800000)
  
  setInterval(() => {
  checkKayıtsız();
  }, 1800000);
  function checkKayıtsız() {
  if (cfg.Roles.KayıtsızRolü) client.guilds.cache.get(cfg.Server.GuildID).members.cache.filter(uye => uye.roles.cache.size === 1).array().forEach((uye, index) => setTimeout(() => { uye.roles.add(cfg.Roles.KayıtsızRolü).catch(() => { }); }, index*1000));}}

module.exports.conf = {
  name: "ready",
};
