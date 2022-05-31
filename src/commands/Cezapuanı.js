module.exports = {
  conf: {
    aliases: ["cezapuan"],
    name: "cezapuanı",
    usage: 'cezapuanı [üye]',
    description: 'Belirttiğiniz üyenin ceza puanına bakarsınız.',
  },

 run: async ({client, msg, args, cfg, author, guild, MessageEmbed, CezapuanDatabase, CezaSayıDatabase}) => {
   
  if (!msg.member.roles.cache.some(r => cfg.Hammer.Other.includes(r.id)) && !msg.member.roles.cache.some(r => cfg.Hammer.BotCommands.includes(r.id)) && !msg.member.hasPermission(8)) return client.timemessage(client.yetersizYetki(msg, msg), msg.channel.id, 5000)
  let user = msg.mentions.users.first() || client.users.cache.get(args[0]) || msg.author;
  const member = msg.guild.member(user);
  let CezapuanData = await CezapuanDatabase.findOne({ guildID: msg.guild.id, userID: member.id})
  let chatMutee = CezapuanData && CezapuanData.cezapuanıchatmute ? CezapuanData.cezapuanıchatmute : 0
  let sesMutee = CezapuanData && CezapuanData.cezapuanıvoicemute ? CezapuanData.cezapuanıvoicemute : 0
  let bann = CezapuanData && CezapuanData.cezapuanıban ? CezapuanData.cezapuanıban : 0
  let jaill = CezapuanData && CezapuanData.cezapuanıjail ? CezapuanData.cezapuanıjail : 0
  let totall = chatMutee+sesMutee+bann+jaill;
  let durum;if(totall > 101) durum = "Aşırı Güvensiz";if(totall === 101) durum = "Aşırı Güvensiz";if(totall < 100) durum = "Aşırı Tehlikeli";if(totall === 100) durum = "Aşırı Tehlikeli";if(totall === 71) durum = "Aşırı Tehlikeli";if(totall < 70) durum = "Tehlikeli";if(totall === 70) durum = "Tehlikeli";if(41 === totall) durum = "Tehlikeli";if(totall === 40) durum = "Şüpheli";if(totall < 40) durum = "Şüpheli";if(21 === totall) durum = "Şüpheli";if(totall < 20) durum = "Güvenli";if(20 === totall) durum = "Güvenli";if(totall === 1) durum = "Güvenli";if(totall == `0`) durum = "Çok Güvenli";
  msg.channel.send(`${member} üyesi: ${totall} cezapuanı (\`${durum}\`)`)}}
