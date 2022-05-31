module.exports = {
  conf: {
    aliases: [],
    name: "taşı",
    usage: 'taşı [üye] [kanal]',
    description: 'Belirttiğiniz kullanıcıyı belirttiğiniz kanala taşırsınız.',
 },

 run: async ({client, msg, args, cfg, author, uye, guild, MessageEmbed}) => {
   
  if (!msg.member.roles.cache.some(r => cfg.Hammer.Other.includes(r.id)) && !msg.member.roles.cache.some(r => cfg.Hammer.Move.includes(r.id)) && !msg.member.hasPermission(8)) return client.timemessage(client.yetersizYetki(msg, msg), msg.channel.id, 5000)
  if (!uye) return client.timemessage(client.normalEmbed(`Lütfen bir üyeyi etiketle ve tekrar dene!`, msg), msg.channel.id, 5000)
  if (uye.hasPermission(8)) return client.timemessage(client.normalEmbed(`Yöneticilere herhangi bir işlem uygulayamazsın.`, msg), msg.channel.id, 5000)
  if (uye.user.bot)  return client.timemessage(client.normalEmbed(`Botlara herhangi bir işlem uygulayamazsın.`, msg), msg.channel.id, 5000)
  if (uye.id == (`${msg.author.id}`)) return client.timemessage(client.normalEmbed(`Kendine herhangi bir işlem uygulayamazsın.`, msg), msg.channel.id, 5000)
  if (!uye.voice.channel) return client.timemessage(client.normalEmbed(`Belirttiğiniz Kullanıcı Bir Ses Kanalında Bulunmuyor.`, msg), msg.channel.id, 5000)
  if (!args[1]) return client.timemessage(client.normalEmbed(`Lütfen tüm argümanları doğru giriniz!\nÖrnek Kullanım: !taşı {user} {kanal}`, msg), msg.channel.id, 5000)
  if (client.channels.cache.get(args[1]).type === "category") return client.timemessage(client.normalEmbed(`Bir ses kanalı ID'si girmelisin.`, msg), msg.channel.id, 5000)
  if (client.channels.cache.get(args[1]).type === "text") return client.timemessage(client.normalEmbed(`Bir ses kanalı ID'si girmelisin.`, msg), msg.channel.id, 5000)
  uye.voice.setChannel(`${args[1]}`).catch(() => { })
  client.timemessage(client.normalEmbed(`${uye} adlı üye <#${args[1]}> adlı kanala başarıyla taşındı.`, msg), msg.channel.id, 5000)
  client.react(msg, "tick")}}