const cfg = require("../configs/config.json");
const { MessageEmbed } = require("discord.js");
const moment = require("moment");
const client = global.client;
const Discord = require("discord.js");
const VoiceUnmuteDatabase = require("../schemas/VoiceUnmute");

module.exports = async(oldState, newState) => {
  
  const VoiceUnmuteStatusData = await VoiceUnmuteDatabase.findOne({ guildID: oldState.member.guild.id, userID: oldState.member.id})
  if(!oldState.channelID) {
  if(VoiceUnmuteStatusData && VoiceUnmuteStatusData.unmutedurum === "Kaldırılamadı") {
  let author = client.users.cache.get(VoiceUnmuteStatusData && VoiceUnmuteStatusData.authorID)
  if(VoiceUnmuteStatusData) {VoiceUnmuteStatusData.delete()}
  newState.setMute(false)}}}

module.exports.conf = {
  name: "voiceStateUpdate",
};
