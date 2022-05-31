module.exports = {
  conf: {
    aliases: ["cezapsıfırla","cezapuansıfırla","cezapuanısil"],
    name: "cezapuanısıfırla",
    usage: 'cezapuanısıfırla [üye]',
    description: 'Belirttiğiniz üyenin ceza puanınaı sıfırlarsınız.',
    serverowner: true,
},

 run: async ({client, msg, args, cfg, author, MessageEmbed, uye, CezapuanDatabase}) => {
   
  if (!msg.member.roles.cache.some(r => cfg.Hammer.Other.includes(r.id)) && !msg.member.hasPermission(8)) return client.timemessage(client.yetersizYetki(msg, msg), msg.channel.id, 5000)
  if (!uye) return client.timemessage(client.normalEmbed(`Lütfen bir üyeyi etiketle ve tekrar dene!`, msg), msg.channel.id, 5000)
  if (uye.user.bot)  return client.timemessage(client.normalEmbed(`Botlara herhangi bir işlem uygulayamazsın.`, msg), msg.channel.id, 5000)
  if (uye.id == (`${msg.author.id}`)) return client.timemessage(client.normalEmbed(`Kendine herhangi bir işlem uygulayamazsın.`, msg), msg.channel.id, 5000)
  client.timemessage(client.normalEmbed(`Başarıyla ${uye} üyesinin ceza puanı sıfırlandı.`, msg), msg.channel.id, 5000)
  client.react(msg, "tick")
  await CezapuanDatabase.findOneAndUpdate({ guildID: msg.guild.id, userID: uye.id}, { $set: { cezapuanıban: 0, cezapuanıchatmute: 0, cezapuanıvoicemute: 0, cezapuanıjail: 0 } }, { upsert: true });}}