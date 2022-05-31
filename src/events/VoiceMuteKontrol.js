const cfg = require("../configs/config.json");
const { MessageEmbed } = require("discord.js");
const client = global.client;
const Discord = require("discord.js");
const CezaDatabase = require("../schemas/Ceza");

module.exports = async() => {
  
  setInterval(async() => {
  CezaDatabase.find({voicemuted: true, Type: "Voice Mute"}, (err, muteData) => {
  if ((!muteData) || (muteData.length < 1)) return null;
   for (var muteler of muteData) {
  let uye = client.guilds.cache.get(cfg.Server.GuildID).members.cache.get(muteler.userID);
  if (Date.now() >= muteler.finishDate) { 
  muteler.voicemuted = false
  muteler.save()
  if (uye && uye.voice.channel && uye.voice.serverMute) uye.voice.setMute(false)  
  } else {if (uye && uye.voice.channel && !uye.voice.serverMute) uye.voice.setMute(true);}}})}, 5000);}

module.exports.conf = {
  name: "ready",
};
