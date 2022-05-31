module.exports = {
  conf: {
    aliases: ["unreg","unregister","yeniüye"],
    name: "kayıtsız",
    usage: 'kayıtsız [üye]',
    description: 'Belirttiğiniz kullanıcıyı kayıtsıza atarsınız.',
 },

 run: async ({client, msg, args, cfg, author, uye}) => {
   
  if (!msg.member.roles.cache.some(r => cfg.Hammer.Other.includes(r.id)) && !msg.member.roles.cache.some(r => cfg.Hammer.RolAlVerYetkilisi.includes(r.id)) && !msg.member.hasPermission(8)) return client.timemessage(client.yetersizYetki(msg, msg), msg.channel.id, 5000) 
  if (!uye) return client.timemessage(client.normalEmbed(`Lütfen bir üyeyi etiketle ve tekrar dene!`, msg), msg.channel.id, 5000)
  if (uye.hasPermission(8)) return client.timemessage(client.normalEmbed(`Yöneticileri kayıtsıza atamazsın.`,msg), msg.channel.id, 5000)
  if (uye.user.bot)  return client.timemessage(client.normalEmbed(`Botlara herhangi bir işlem uygulayamazsın.`,msg), msg.channel.id, 5000)
  if (msg.member.roles.highest.position < uye.roles.highest.position) return client.timemessage(client.normalEmbed(`Kayıtsıza atmaya çalıştığın üye senle aynı yetkide veya senden üstün.`,msg), msg.channel.id, 5000)
  if (uye.id == (`${msg.author.id}`)) return client.timemessage(client.normalEmbed(`Kendine herhangi bir işlem uygulayamazsın.`, msg), msg.channel.id, 5000)
  if (uye.roles.cache.has(cfg.Roles.KayıtsızRolü)) return client.timemessage(client.normalEmbed(`${uye} kişisi zaten veritabanında kayıtsız olarak bulunuyor.`, msg), msg.channel.id, 5000)
  client.setRoles(uye.id, cfg.Roles.KayıtsızRolü)
  client.timemessage(client.normalEmbed(`${uye} kişisine kayıtsız rolü verildi.`, msg), msg.channel.id, 5000)
  client.react(msg, "tick")}}