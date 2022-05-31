const cfg = require("../configs/config.json");
const { MessageEmbed } = require("discord.js");
const moment = require("moment");
const client = global.client;
const Discord = require("discord.js");
const MsgDeleteDatabase = require("../schemas/MessageDelete");

module.exports = async (msg) => {

const Log = new Discord.WebhookClient(cfg.Webhook.LogWebhook.ID, cfg.Webhook.LogWebhook.Token);
if (!msg || !msg.content) return;
let MsgDeleteData = await MsgDeleteDatabase.findOne({guildID: msg.guild.id, channelID: msg.channel.id})
if(!MsgDeleteData) {let newMsgData = new MsgDeleteDatabase({guildID: msg.guild.id, channelID: msg.channel.id, msg: [{userID: msg.author.id, msg: msg.content, date: Date.now()}]}).save();} else{
MsgDeleteData.msg.push({userID: msg.author.id, msg: msg.content, date: Date.now()}); 
MsgDeleteData.save();}
let msgatılma = `${moment(msg.createdTimestamp).format("DD")} ${moment(msg.createdTimestamp).format("MM").replace(/01/, 'Ocak').replace(/02/, 'Şubat').replace(/03/, 'Mart').replace(/04/, 'Nisan').replace(/05/, 'Mayıs').replace(/06/, 'Haziran').replace(/07/, 'Temmuz').replace(/08/, 'Ağustos').replace(/09/, 'Eylül').replace(/10/, 'Ekim').replace(/11/, 'Kasım').replace(/12/, 'Aralık')} ${moment(msg.createdTimestamp).format("YYYY")} ${moment(msg.createdTimestamp).format("HH:mm")}` 
msg.member.guild.channels.cache.get("966507043957645374").send(new MessageEmbed().setThumbnail(msg.author.avatarURL({dynamic:true})).setColor(0x2F3136).setDescription("<@!"+msg.author+"> üyesi <#"+msg.channel+"> kanalında mesajını sildi.\n\n **__Silinen Mesaj__:** \`"+msg.content.replace("`", "")+"\`\n\n```Kanal: "+msg.channel.name+" ("+msg.channel.id+")\nKullanıcı: "+msg.author.tag+" ("+msg.author.id+")\nMesaj ID: "+msg.id+"\nMesaj Atılış: "+msgatılma+"```").setAuthor(msg.author.tag, msg.author.avatarURL({dynamic:true})))

}
module.exports.conf = {
  name: "messageDelete"
};