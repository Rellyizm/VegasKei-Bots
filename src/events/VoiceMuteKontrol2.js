const cfg = require("../configs/config.json");
const { MessageEmbed } = require("discord.js");
const moment = require("moment");
const client = global.client;
const Discord = require("discord.js");
const ms = require('ms')
const VoiceMuteDatabase = require("../schemas/VoiceMute");
const CezaDatabase = require("../schemas/Ceza");

module.exports = async(oldState, newState) => {
  
    const VoiceUnmuteStatusData = await VoiceMuteDatabase.findOne({ guildID: oldState.member.guild.id, userID: oldState.member.id})
    if(!oldState.channelID) {
    if(VoiceUnmuteStatusData) { 
    const author = client.users.cache.get(VoiceUnmuteStatusData && VoiceUnmuteStatusData.authorID)
    const time = VoiceUnmuteStatusData && VoiceUnmuteStatusData.time
    const Reason = VoiceUnmuteStatusData && VoiceUnmuteStatusData.Reason
    const cezaID = VoiceUnmuteStatusData && VoiceUnmuteStatusData.cezaID
    const timereplace = VoiceUnmuteStatusData && VoiceUnmuteStatusData.timems
    var tarih2 = ms(timereplace)
    var tarih3 = Date.now()+timereplace
    newState.setMute(true)
    setTimeout(async() => {
    if(!newState.channelID) {
    client.channels.cache.get(cfg.Channels.VoiceMute).send(new MessageEmbed().setColor("27d38a").setFooter(`Ceza Numarası: #${cezaID}`).setAuthor(author.tag, author.avatarURL({dynamic:true})).setDescription(`<@${newState.id}> (\`${newState.id}\`) üyesi susturulması biteceği süre içinde sesli kanallarda bulunmadığı için süresi sıfırlandı, bir kanala girerse tekrar başlayacak.\n\n• Mute Başlangıç \`${moment(Date.now()).locale('TR').format('LLL')}\`\n• Mute Bitiş \`${moment(tarih3).locale('TR').format('LLL')}\`\n• Süre \`${time}\`\n\n• Sebep \`${Reason}\``)) 
    } else if(newState.channelID) {
    newState.setMute(false)
    let CezaData = await CezaDatabase.findOne({ guildID: cfg.Server.GuildID, userID: oldState.member.id}) 
    CezaData.voicemuted = false
    CezaData.save()
    let VoiceMuteData = await VoiceMuteDatabase.findOne({ guildID: oldState.member.guild.id, userID: oldState.member.id})  
    if(VoiceMuteData) {VoiceMuteData.delete()}
    VoiceUnmuteStatusData.delete()}
    }, timereplace)}}}

module.exports.conf = {
  name: "voiceStateUpdate",
};
