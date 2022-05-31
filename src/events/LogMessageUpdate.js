const cfg = require("../configs/config.json");
const { MessageEmbed } = require("discord.js");
const moment = require("moment");
const client = global.client;
const Discord = require("discord.js");

module.exports = async (oldMsg, newMsg) => {
  
const Log = new Discord.WebhookClient(cfg.Webhook.LogWebhook.ID, cfg.Webhook.LogWebhook.Token);
if (oldMsg.content == newMsg.content) return;
let oldMsgAtılma = `${moment(oldMsg.createdTimestamp).format("DD")} ${moment(oldMsg.createdTimestamp).format("MM").replace(/01/, 'Ocak').replace(/02/, 'Şubat').replace(/03/, 'Mart').replace(/04/, 'Nisan').replace(/05/, 'Mayıs').replace(/06/, 'Haziran').replace(/07/, 'Temmuz').replace(/08/, 'Ağustos').replace(/09/, 'Eylül').replace(/10/, 'Ekim').replace(/11/, 'Kasım').replace(/12/, 'Aralık')} ${moment(oldMsg.createdTimestamp).format("YYYY")} ${moment(oldMsg.createdTimestamp).format("HH:mm")}` 
oldMsg.member.guild.channels.cache.get("966507043957645374").send(new MessageEmbed().setThumbnail(oldMsg.author.avatarURL({dynamic:true})).setColor(0x2F3136).setDescription("<@!"+oldMsg.author+"> üyesi <#"+oldMsg.channel+"> kanalında bir mesajını düzenledi.\n\n**__Eski Mesaj__:** \`"+oldMsg.content+"\`\n**__Düzenlenen Mesaj__:** \`"+newMsg.content+"\`\n\n```Kanal: "+oldMsg.channel.name+" ("+oldMsg.channel.id+")\nKullanıcı: "+oldMsg.author.tag+" ("+oldMsg.author.id+")\nMesaj ID: "+oldMsg+"\nMesaj Atılış: "+oldMsgAtılma+"```").setAuthor(newMsg.author.tag, newMsg.author.avatarURL({dynamic:true})))
                                                   
}
module.exports.conf = {
  name: "messageUpdate"
};