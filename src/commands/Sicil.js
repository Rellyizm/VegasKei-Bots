const {MessageAttachment} = require('discord.js');
const { table } = require('table');

module.exports = {
  conf: {
    aliases: ["sorgu"],
    name: "sicil",
    usage: 'sicil [üye]',
    description: 'Belirttiğiniz üyenin sicil hakkında detaylı bilgi alırsınız.',
},

 run: async ({client, msg, args, cfg, author, MessageEmbed, uye, fs, CezaDatabase, CezaSayıDatabase, CezapuanDatabase, PunitiveStatus, moment}) => {
   
  try{if (!msg.member.roles.cache.some(r => cfg.Hammer.Other.includes(r.id)) && !msg.member.roles.cache.some(r => cfg.Hammer.BotCommands.includes(r.id)) &&!msg.member.hasPermission(8)) return client.timemessage(client.yetersizYetki(msg, msg), msg.channel.id, 5000)                              
  if (!uye) return client.timemessage(client.normalEmbed(`Lütfen bir üyeyi etiketle ve tekrar dene!`, msg), msg.channel.id, 5000)
  const CezaSayıData = await CezaSayıDatabase.findOne({ guildID: msg.guild.id, userID: uye.id});
  let CezapuanData = await CezapuanDatabase.findOne({ guildID: msg.guild.id, userID: uye.id})
  let chatMute = CezaSayıData && CezaSayıData.chatmute ? CezaSayıData.chatmute : 0
  let sesMute = CezaSayıData && CezaSayıData.voicemute ? CezaSayıData.voicemute : 0
  let ban = CezaSayıData && CezaSayıData.ban ? CezaSayıData.ban : 0
  let jail = CezaSayıData && CezaSayıData.jail ? CezaSayıData.jail : 0
  let total = chatMute+sesMute+ban+jail;
  let chatMutee = CezapuanData && CezapuanData.cezapuanıchatmute ? CezapuanData.cezapuanıchatmute : 0
  let sesMutee = CezapuanData && CezapuanData.cezapuanıvoicemute ? CezapuanData.cezapuanıvoicemute : 0
  let bann = CezapuanData && CezapuanData.cezapuanıban ? CezapuanData.cezapuanıban : 0
  let jaill = CezapuanData && CezapuanData.cezapuanıjail ? CezapuanData.cezapuanıjail : 0
  let totall = chatMutee+sesMutee+bann+jaill;
  await CezaDatabase.find({ userID: uye.id }).sort({ cezaID: "descending" }).exec(async (err, res) => {
   if(!res) return client.timemessage(client.normalEmbed(`${uye} kullanıcısının ceza bilgisi bulunmuyor.`, msg), msg.channel.id, 7000)
             let datax = [
                ["ID", "Tarih", "Ceza", "Sebep"]
            ];
    
            let dataxe = [
                ["ID", "Ceza", "Tarih", "Bitiş", "Yetkili", "Sebep"]
            ];
            let config = {
                border: {
                    topBody: ``,
                    topJoin: ``,
                    topLeft: ``,
                    topRight: ``,

                    bottomBody: ``,
                    bottomJoin: ``,
                    bottomLeft: ``,
                    bottomRight: ``,

                    bodyLeft: `│`,
                    bodyRight: `│`,
                    bodyJoin: `│`,

                    joinBody: ``,
                    joinLeft: ``,
                    joinRight: ``,
                    joinJoin: ``
                }
            };
           res.map(x => {
                datax.push([x.cezaID, moment(x.date).locale("TR").format("LLL"), x.Type, x.Reason])
            })
           res.map(x => {
                dataxe.push([x.cezaID, x.Type, moment(x.date).locale("TR").format("LLL"), moment(x.finishDate).locale("TR").format("LLL"), client.users.cache.get(x.authorID).tag, x.Reason])
            })
            let out = table(dataxe, config)
            let outi = table(datax.slice(0, 10), config)
            
    msg.channel.send('<@!'+uye+'> kullanıcısının toplam '+total+' cezası bulunmakta son 10 ceza aşağıda belirtilmiştir.Tüm ceza bilgi dosyasını indirmek için 🚫 emojisine, ceza sayılarına bakmak için ❔ emojisine basabilirsin.Tekli bir cezaya bakmak için \`!ceza ID\` komutunu uygulayınız.```'+outi+'```').then(message => {
    message.react("🚫").then(async(r) => {
    await message.react('❔');});
    message.awaitReactions((reaction, user) => user.id == msg.author.id && (reaction.emoji.name == '🚫' || reaction.emoji.name == '❔'),
    { max: 1, time: 30000 }).then(async collected => {
    if (collected.first().emoji.name == '🚫') {
    message.channel.send(`${uye} kullanıcısının toplam ${datax.length} cezası aşağıdaki belgede yazmaktadır.`, { files: [{ attachment: Buffer.from(out), name: `${uye.user.username}_cezalar.txt` }] }).then(msg => {
    message.delete({ timeout: 5000 })})} else {
    message.edit("" + uye.user.tag + " kullanıcısının ceza bilgileri aşağıda belirtilmiştir:\n\nChat Mute: " + chatMute + " kez.\nSes Mute: " + sesMute + " kez.\nCezalı Bilgisi: "+ jail + " kez.\nBan Bilgisi: " + ban + " kez.\n\nKullanıcı toplamda " + datax.length + " kez kural ihlali yapmış, kullanıcının ceza puanı "+totall+".", {code: "js"})}})})})}catch{{}}}}
