const cfg = require("../configs/config.json");
const { MessageEmbed } = require("discord.js");
const moment = require("moment");
const client = global.client;
const Discord = require("discord.js");

module.exports = async (msg) => {
 
const Log = new Discord.WebhookClient(cfg.Webhook.LogWebhook.ID, cfg.Webhook.LogWebhook.Token);
var Attachment = (msg.attachments)
if (Attachment){
if(Attachment.array()[0]!==undefined){
let msgatılma = `${moment(msg.createdTimestamp).format("DD")} ${moment(msg.createdTimestamp).format("MM").replace(/01/, 'Ocak').replace(/02/, 'Şubat').replace(/03/, 'Mart').replace(/04/, 'Nisan').replace(/05/, 'Mayıs').replace(/06/, 'Haziran').replace(/07/, 'Temmuz').replace(/08/, 'Ağustos').replace(/09/, 'Eylül').replace(/10/, 'Ekim').replace(/11/, 'Kasım').replace(/12/, 'Aralık')} ${moment(msg.createdTimestamp).format("YYYY")} ${moment(msg.createdTimestamp).format("HH:mm")}` 
msg.member.guild.channels.cache.get("966507043957645374").send(new MessageEmbed().setThumbnail(msg.author.avatarURL({dynamic:true})).setColor(0x2F3136).setDescription("<@!"+msg.author+"> üyesi <#"+msg.channel+"> kanalında bir resim sildi.\n\n```Kanal: "+msg.channel.name+" ("+msg.channel.id+")\nKullanıcı: "+msg.author.tag+" ("+msg.author.id+")\nMesaj ID: "+msg.id+"\nMesaj Atılış: "+msgatılma+"```\n**__Silinen Resim__:**").setImage(Attachment.array()[0].proxyURL).setAuthor(msg.author.tag, msg.author.avatarURL({dynamic:true})))}}
  
}
module.exports.conf = {
  name: "messageDelete"
};