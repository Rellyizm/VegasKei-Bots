module.exports = {
  conf: {
    aliases: ["r"],
    name: "rol",
    usage: 'rol al/ver [üye] [rol]',
    description: 'Belirttiğiniz kullanıcıya belirttiğiniz rolü verip alabilirsiniz.',
},

 run: async ({client, msg, args, cfg, author, MessageEmbed, prefix, moment, GeneralDatabase}) => {

  if (!msg.member.roles.cache.some(r => cfg.Hammer.Other.includes(r.id)) && !msg.member.roles.cache.some(r => cfg.Hammer.RolAlVerYetkilisi.includes(r.id)) &&!msg.member.hasPermission(8)) return client.timemessage(client.yetersizYetki(msg, msg), msg.channel.id, 5000) 
  let sorgu = args[0]
  let rol = msg.mentions.roles.first() || msg.guild.roles.cache.get(args[2])
  let user = msg.mentions.members.first() || msg.guild.members.cache.get(args[1])
  if (sorgu == "yardım" || sorgu == "yardim" || sorgu == "help" || !sorgu){client.message(client.normalEmbed(`Yapmak istediğin işlemi belirtmelisin!\n\n> ${prefix}rol {al} {üye} {rol}\n> ${prefix}rol {ver} {üye} {rol}`, msg), msg.channel.id)}
  if (sorgu == "al" || sorgu == "a" || sorgu == "Al" || sorgu == "AL"){
  if (!user) return client.timemessage(client.normalEmbed(`Lütfen bir üyeyi etiketle ve tekrar dene!`, msg), msg.channel.id, 5000)
  if (msg.member.roles.highest.position < user.roles.highest.position) return client.timemessage(client.normalEmbed(`Rol almaya çalıştığın üye senle aynı yetkide veya senden üstün!`, msg), msg.channel.id, 5000)
  if (user.user.bot)  return client.timemessage(client.normalEmbed(`Botlara herhangi bir işlem uygulayamazsın.`, msg), msg.channel.id, 5000)
  if (user.id == (`${msg.author.id}`)) return client.timemessage(client.normalEmbed(`Kendine herhangi bir işlem uygulayamazsın.`, msg), msg.channel.id, 5000)
  if (!rol) return client.timemessage(client.normalEmbed(`Lütfen belirttiğin kullanıcıdan almak istediğin rolü nelirt!\n\`!rol {al} {üye} {rol}\``, msg), msg.channel.id, 5000)
  if (!user.roles.cache.has(`${rol.id}`)) return client.timemessage(client.normalEmbed(`${user} Kişisinde ${rol} rolü mevcut değil.`, msg), msg.channel.id, 5000)
  if (rol.permissions.has('ADMINISTRATOR')) return client.timemessage(client.normalEmbed(`**Yönetici** yetkisi bulunan rolü üyeden alamazsın.`, msg), msg.channel.id, 5000)
  if (rol.permissions.has('KICK_MEMBERS')) return client.timemessage(client.normalEmbed(`**Kick** yetkisi bulunan rolü üyeden alamazsın.`, msg), msg.channel.id, 5000)
  if (rol.permissions.has('BAN_MEMBERS')) return client.timemessage(client.normalEmbed(`**Ban** yetkisi bulunan rolü üyeden alamazsın.`, msg), msg.channel.id, 5000)
  if (rol.permissions.has('MANAGE_CHANNELS')) return client.timemessage(client.normalEmbed(`**Kanalları Yönet** yetkisi bulunan rolü üyeden alamazsın.`, msg), msg.channel.id, 5000)
  if (rol.permissions.has('MANAGE_GUILD')) return client.timemessage(client.normalEmbed(`**Sunucuyu Yönet** yetkisi bulunan rolü üyeden alamazsın.`, msg), msg.channel.id, 5000)
  if (rol.permissions.has('VIEW_AUDIT_LOG')) return client.timemessage(client.normalEmbed(`**Denetim Kaydını Yönet** yetkisi bulunan rolü üyeden alamazsın.`, msg), msg.channel.id, 5000)
  if (rol.permissions.has('MENTION_EVERYONE')) return client.timemessage(client.normalEmbed(`**Everyone & Here Atma** yetkisi bulunan rolü üyeden alamazsın.`, msg), msg.channel.id, 5000)
  if (rol.permissions.has('MANAGE_ROLES')) return client.timemessage(client.normalEmbed(`**Rolleri Yönet** yetkisi bulunan rolü üyeden alamazsın.`, msg), msg.channel.id, 5000)
  if (rol.permissions.has('MANAGE_WEBHOOKS')) return client.timemessage(client.normalEmbed(`**Webhookları Yönet** yetkisi bulunan rolü üyeden alamazsın.`, msg), msg.channel.id, 5000)
  if (rol.permissions.has('MANAGE_EMOJIS')) return client.timemessage(client.normalEmbed(`**Emojileri Yönet** yetkisi bulunan rolü üyeden alamazsın.`, msg), msg.channel.id, 5000)
  if (!user.roles.cache.has(rol.id)) return client.timemessage(client.normalEmbed(`${user} Kişisinde ${rol} rolü zaten mevcut değil.`, msg), msg.channel.id, 5000)
  user.roles.remove(rol);
  let GeneralData = await GeneralDatabase.findOne({ guildID: msg.guild.id, userID: user.id})
  if(!GeneralData) {let newGeneralDatabase = new GeneralDatabase({guildID: msg.guild.id, userID: user.id, rollogtotal: 1, rollog: [{role: `${cfg.Emoji.RedEmoji} Rol: ${rol} Yetkili: ${msg.author}\nTarih: ${moment(cfg.Bot.Heroku === true ? Date.now() : Date.now()).locale("TR").format("LLL")}`}]}).save();} else{
  GeneralData.rollog.push({role: `${cfg.Emoji.RedEmoji} Rol: ${rol} Yetkili: ${msg.author}\nTarih: ${moment(Date.now()).locale("TR").format("LLL")}`}); 
  await GeneralDatabase.findOneAndUpdate({ guildID: msg.guild.id, userID: user.id}, { $inc: { rollogtotal: 1 } }, { upsert: true })
  GeneralData.save();}
  const vegasembed = new MessageEmbed().setAuthor(msg.guild.name, msg.guild.iconURL({dynamic: true})).setColor(client.vegasRenkler[Math.floor(Math.random() * client.vegasRenkler.length)]).setDescription(`${user} Kişisinden ${rol} rolünü aldım.`)
  msg.channel.send(vegasembed)}
  if(sorgu == "ver" || sorgu == "v" || sorgu == "VER" || sorgu == "Ver"){
  if (!user) return client.timemessage(client.normalEmbed(`Lütfen bir üyeyi etiketle ve tekrar dene!`, msg), msg.channel.id, 5000)
  if(msg.member.roles.highest.position < user.roles.highest.position) return client.timemessage(client.normalEmbed(`Rol almaya çalıştığın üye senle aynı yetkide veya senden üstün!`, msg), msg.channel.id, 5000)
  if (user.user.bot)  return client.timemessage(client.normalEmbed(`Botlara herhangi bir işlem uygulayamazsın.`, msg), msg.channel.id, 5000)
  if (user.id == (`${msg.author.id}`)) return client.timemessage(client.normalEmbed(`Kendine herhangi bir işlem uygulayamazsın.`, msg), msg.channel.id, 5000)
  if (!rol) return client.timemessage(client.normalEmbed(`Lütfen belirttiğin kullanıcıdan almak istediğin rolü belirt!\n\`!rol {ver} {üye} {rol}\``, msg), msg.channel.id, 5000)
  if (rol.permissions.has('ADMINISTRATOR')) return client.timemessage(client.normalEmbed(`**Yönetici** yetkisi bulunan rolü üyeye veremezsin.`, msg), msg.channel.id, 5000)
  if (rol.permissions.has('KICK_MEMBERS')) return client.timemessage(client.normalEmbed(`**Kick** yetkisi bulunan rolü üyeye veremezsin.`, msg), msg.channel.id, 5000)
  if (rol.permissions.has('BAN_MEMBERS')) return client.timemessage(client.normalEmbed(`**Ban** yetkisi bulunan rolü üyeye veremezsin.`, msg), msg.channel.id, 5000)
  if (rol.permissions.has('MANAGE_CHANNELS')) return client.timemessage(client.normalEmbed(`**Kanalları Yönet** yetkisi bulunan rolü üyeye veremezsin.`, msg), msg.channel.id, 5000)
  if (rol.permissions.has('MANAGE_GUILD')) return client.timemessage(client.normalEmbed(`**Sunucuyu Yönet** yetkisi bulunan rolü üyeye veremezsin..`, msg), msg.channel.id, 5000)
  if (rol.permissions.has('VIEW_AUDIT_LOG')) return client.timemessage(client.normalEmbed(`**Denetim Kaydını Yönet** yetkisi bulunan rolü üyeye veremezsin.`, msg), msg.channel.id, 5000)
  if (rol.permissions.has('MENTION_EVERYONE')) return client.timemessage(client.normalEmbed(`**Everyone & Here Atma** yetkisi bulunan rolü üyeye veremezsin.`, msg), msg.channel.id, 5000)
  if (rol.permissions.has('MANAGE_ROLES')) return client.timemessage(client.normalEmbed(`**Rolleri Yönet** yetkisi bulunan rolü üyeye veremezsin.`, msg), msg.channel.id, 5000)
  if (rol.permissions.has('MANAGE_WEBHOOKS')) return client.timemessage(client.normalEmbed(`**Webhookları Yönet** yetkisi bulunan rolü üyeye veremezsin.`, msg), msg.channel.id, 5000)
  if (rol.permissions.has('MANAGE_EMOJIS')) return client.timemessage(client.normalEmbed(`**Emojileri Yönet** yetkisi bulunan rolü Üyeye veremezsin.`, msg), msg.channel.id, 5000)
  if (user.roles.cache.has(rol.id)) return client.timemessage(client.normalEmbed(`${user} Kişisinde ${rol} rolü zaten mevcut.`, msg), msg.channel.id, 5000)
  user.roles.add(rol);
  let GeneralData = await GeneralDatabase.findOne({ guildID: msg.guild.id, userID: user.id})
  if(!GeneralData) {let newGeneralDatabase = new GeneralDatabase({guildID: msg.guild.id, userID: user.id, rollogtotal: 1, rollog: [{role: `${cfg.Emoji.TickEmoji} Rol: ${rol} Yetkili: ${msg.author}\nTarih: ${moment(cfg.Bot.Heroku === true ? Date.now() : Date.now()).locale("TR").format("LLL")}`}]}).save();} else{
  GeneralData.rollog.push({role: `${cfg.Emoji.TickEmoji} Rol: ${rol} Yetkili: ${msg.author}\nTarih: ${moment(Date.now()).locale("TR").format("LLL")}`}); 
  await GeneralDatabase.findOneAndUpdate({ guildID: msg.guild.id, userID: user.id}, { $inc: { rollogtotal: 1 } }, { upsert: true })
  GeneralData.save();}
  const vegasembed = new MessageEmbed().setAuthor(msg.guild.name, msg.guild.iconURL({dynamic: true})).setColor(client.vegasRenkler[Math.floor(Math.random() * client.vegasRenkler.length)]).setDescription(`${user} Kişisine ${rol} rolünü ekledim.`)
  msg.channel.send(vegasembed)}client.react(msg, "tick")}}