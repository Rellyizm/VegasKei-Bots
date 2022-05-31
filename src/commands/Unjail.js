module.exports = {
  conf: {
    aliases: ["af","unslave", "unkarantina", "karantinaç"],
    name: "unjail",
    usage: 'unjail [üye]',
    description: 'Belirttiğiniz kullanıcıyı cezalıdan çıkarırsınız. (Kullanıcıya Bot İle Jail Atılmadıysa da Cezalısını Kaldırabilirsiniz.)',
 },

 run: async ({client, msg, args, cfg, author, uye, guild, MessageEmbed, moment, CezaExtraRolesDatabase, CezalıRolesDatabase, CezaSayıDatabase, PunitiveStatus, ControlsDatabase, CezaDatabase}) => {
   
  if (!msg.member.roles.cache.some(r => cfg.Hammer.Other.includes(r.id)) && !msg.member.roles.cache.some(r => cfg.Hammer.Jail.includes(r.id)) && !msg.member.hasPermission(8)) return client.timemessage(client.yetersizYetki(msg, msg), msg.channel.id, 5000)
  if (!uye) return client.timemessage(client.normalEmbed(`Lütfen bir üyeyi etiketle ve tekrar dene!`, msg), msg.channel.id, 5000)
  if (uye.user.bot)  return client.timemessage(client.normalEmbed(`Botlara herhangi bir işlem uygulayamazsın.`, msg), msg.channel.id, 5000)
  if (uye.id == (`${msg.author.id}`)) return client.timemessage(client.normalEmbed(`Kendine herhangi bir işlem uygulayamazsın.`, msg), msg.channel.id, 5000)
  const CezaDatax2 = await CezaDatabase.findOne({ guildID: msg.guild.id, userID: uye.id, jail: true})
  if (!CezaDatax2) {
  client.timemessage(client.normalEmbed(`Kullanıcı bot ile jail yemememiş, sağ tık ile atılan jail kaldırıldı.`, msg), msg.channel.id, 5000)
  uye.roles.remove(cfg.Roles.CezalıRolü).catch(() => { })
  client.react(msg, "tick")
  client.channels.cache.get(cfg.Channels.Jail).send(new MessageEmbed().setColor("27d38a").setFooter(moment(Date.now()).locale("TR").format("LLL")).setAuthor(msg.author.tag, msg.author.avatarURL({ dynamic: true })).setDescription(`${uye} (\`${uye.id}\`) üyesinin cezalı rolü kaldırıldı.\n\n• Cezayı kaldıran yetkili ${msg.author} (\`${msg.author.id}\`)`))
  return}    
  client.react(msg, "tick")
  client.channels.cache.get(cfg.Channels.Jail).send(new MessageEmbed().setColor("27d38a").setFooter(`Ceza Numarası: #${CezaDatax2.cezaID}`).setAuthor(msg.author.tag, msg.author.avatarURL({ dynamic: true })).setDescription(`${uye} (\`${uye.id}\`) üyesinin karantina süresi bitmeden cezası kaldırıldı.`).addField(`**Karantina Bilgisi**`, `• Yetkili <@!${CezaDatax2.authorID}> (\`${CezaDatax2.authorID}\`)\n• Karantina Başlangıç \`${moment(CezaDatax2.date).locale('TR').format('LLL')}\` (\`${moment(CezaDatax2.date).locale('TR').fromNow()}\`)\n• Karantina Bitiş \`${moment(CezaDatax2.finishDate).locale('TR').format('LLL')}\` (\`${moment(CezaDatax2.finishDate).locale('TR').fromNow()}\`)\n• Süre \`${CezaDatax2.time}\`\n• Sebep \`${CezaDatax2.Reason}\``))
  let RolesData = await CezalıRolesDatabase.findOne({ guildID: cfg.Server.GuildID, userID: uye.id})
  let RolesDataExtra = await CezalıRolesDatabase.findOne({ guildID: cfg.Server.GuildID, userID: uye.id})
  if(RolesData && RolesData.roles) {
  uye.roles.add(RolesData.roles).catch(() => {})
  uye.roles.remove(cfg.Roles.CezalıRolü).catch(() => {})
  uye.roles.remove(cfg.Roles.CezalıRolü).catch(() => {})
  RolesData.delete()
  uye.roles.remove(cfg.Roles.CezalıRolü).catch(() => {})
  }else{client.setRoles(uye.id, cfg.Roles.KayıtsızRolü)}
  let CezaData = await CezaDatabase.findOne({ guildID: cfg.Server.GuildID, userID: uye.id, jail: true}) 
  let CezaDataa = await CezaDatabase.findOne({ guildID: cfg.Server.GuildID, userID: uye.id, jail3days: true}) 
  CezaData.jail = false
  CezaData.save()
  if(CezaDataa && CezaDataa.jail3days) {CezaDataa.jail3days = false
  CezaDataa.save()
  if(RolesDataExtra){RolesDataExtra.delete()}}}}
