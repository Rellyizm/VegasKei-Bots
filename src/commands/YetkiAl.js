module.exports = {
  conf: {
    aliases: ["yetkisıfırla","ytal","ytsıfırla"],
    name: "yetkial",
    usage: 'yetkial [üye]',
    description: 'Belirttiğiniz kullanıcının tüm yetkili rollerini alırsınız.',
 },

 run: async ({client, msg, args, cfg, author, uye}) => {
   
  if (!msg.member.roles.cache.some(r => cfg.Hammer.Other.includes(r.id)) && !msg.member.roles.cache.some(r => cfg.Hammer.YetkiliAlım.includes(r.id)) &&!msg.member.hasPermission(8)) return client.timemessage(client.yetersizYetki(msg, msg), msg.channel.id, 5000) 
  if (!uye) return client.timemessage(client.normalEmbed(`Lütfen bir üyeyi etiketle ve tekrar dene!`, msg), msg.channel.id, 5000)
  if (uye.user.bot) return client.timemessage(client.normalEmbed(`Botlara herhangi bir işlem uygulayamazsın.`, msg), msg.channel.id, 5000)
  if (uye.id == (`${msg.author.id}`)) return client.timemessage(client.normalEmbed(`Kendine herhangi bir işlem uygulayamazsın.`, msg), msg.channel.id, 5000)
  if (uye.hasPermission(8)) return client.timemessage(client.normalEmbed(`Yönetici yetkisi olanlara herhangi bir işlem uygulayamazsın.`, msg), msg.channel.id, 5000)
  await uye.roles.remove(uye.roles.cache.filter(rol => rol.position >= client.guilds.cache.get(cfg.Server.GuildID).roles.cache.get(cfg.Roles.EnAltYetkiliRolü).position)).catch(() => { })
  client.timemessage(client.normalEmbed(`${uye} Üyesinden başarıyla yetkili rolleri alındı.`, msg), msg.channel.id, 5000)
  client.react(msg, "tick")}}