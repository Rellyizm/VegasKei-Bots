const cfg = require("../configs/config.json");
const { MessageEmbed } = require("discord.js");
const moment = require("moment");
const client = global.client;
const humanizeDuration = require("humanize-duration")
const StreamerDatabase = require("../schemas/Streamer");

module.exports = async (oldState, newState) => {
 
  
  try{let StreamerData = await StreamerDatabase.findOne({ guildID: newState.member.guild.id, userID: newState.member.id})
  if (!StreamerData) {
  if(newState.member.voice.streaming) { 
  let Streamer = await new StreamerDatabase({guildID: newState.member.guild.id, userID: newState.member.id, date: Date.now()}).save()                                  
  }return;return}
  if (StreamerData) {
  if(newState.member.voice.streaming === false) {
  let süre = `${humanizeDuration(Date.now() - StreamerData.date, {largest: 2, round: true}).replace("second", "saniye").replace("seconds", "saniye").replace("minute", "dakika").replace("minutes", "dakika").replace("hour", "saat").replace("hours", "saat").replace("day", "gün").replace("week", "hafta").replace("month", "ay").replace("year", "yıl").replace("haftas", "hafta").replace("güns", "gün").replace("ays", "ay").replace("yıls", "yıl").replace("dakikas", "dakika").replace("saats", "saat").replace("saniyes", "saniye")}`
  client.channels.cache.get(cfg.Channels.StreamerDenetim).send(new MessageEmbed().setFooter(`📑 Yayına ${moment(StreamerData.date).locale("TR").fromNow()} önce başlamış.`).setDescription(`>  \`>\` ${newState.guild.members.cache.get(newState.id)} - (\`${newState.id}\`) kullanıcısı **${süre}** yayın yapmış.\n>  \n>  \`>\` Başlangıç Tarihi: **${moment(StreamerData.date).locale("TR").format("LLL")}**\n>  \n>  \`>\` Yayın yaptığı kanal: \`${newState.guild.channels.cache.get(oldState.channelID).name} - (${oldState.channelID})\` `).setAuthor(newState.member.user.tag, newState.member.user.avatarURL({dynamic:true})).setColor(0x2F3136)) 
  StreamerData.delete()
  }return}
  } catch {{}}
}
module.exports.conf = {
  name: "voiceStateUpdate"
};
