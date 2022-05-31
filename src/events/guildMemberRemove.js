const cfg = require("../configs/config.json");
const { MessageEmbed } = require("discord.js");
const moment = require("moment");
const client = global.client;
const RegisterDatabase = require("../schemas/Register");

module.exports = async member => {

  if(member.roles.cache.has(cfg.Roles.KayıtsızRolü)) return;
  await RegisterDatabase.findOneAndUpdate({ guildID: member.guild.id, userID: member.id}, { $inc: { isimlerayrılma: 1 } }, { upsert: true })     
  const RegisterData = await RegisterDatabase.findOne({ guildID: member.guild.id, userID: member.id});
  if(!RegisterData) {let newRegisterDatabase = new RegisterDatabase({guildID: member.guild.id, userID: member.id, authorID: member.id, isimler: [{isimler: `\`${member.displayName}\` (Sunucudan Ayrılma)\n`}]}).save();} else{
  RegisterData.isimler.push({isimler: `\`${member.displayName}\` (Sunucudan Ayrılma)\n`}); 
  RegisterData.save();}}

module.exports.conf = {
  name: "guildMemberRemove",
};
