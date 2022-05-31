const cfg = require("../configs/config.json");
const { MessageEmbed } = require("discord.js");
const client = global.client;
const Discord = require("discord.js");
const CezaDatabase = require("../schemas/Ceza");

module.exports = async() => {
  
  setInterval(async() => {
  CezaDatabase.find({chatmuted: true, Type: "Chat Mute"}, (err, muteData) => {
  if ((!muteData) || (muteData.length < 1)) return null;
   for (var muteler of muteData) {
  let uye = client.guilds.cache.get(cfg.Server.GuildID).members.cache.get(muteler.userID);
  if (Date.now() >= muteler.finishDate) { 
  muteler.chatmuted = false
  muteler.save()
  if (uye && uye.roles.cache.has(cfg.Roles.Muted)) uye.roles.remove(cfg.Roles.Muted).catch(() => {})
  } else {if (uye && !uye.roles.cache.has(cfg.Roles.Muted)) uye.roles.add(cfg.Roles.Muted).catch(() => {})}}})} , 1000)}

module.exports.conf = {
  name: "ready",
};
