module.exports = {
  conf: {
    aliases: ["cunmute","unmutechat","chatunmute"],
    name: "unmute",
    usage: 'unmute [üye]',
    description: 'Belirttiğiniz kullanıcının metin kanallarında olan susturulmasını kaldırır. (Kullanıcıya Bot İle Mute Atılmadıysa da Susturulmasını Kaldırabilirsiniz.)',
 },

 run: async ({client, msg, args, cfg, author, uye, guild, moment, MessageEmbed,ControlsDatabase, CezaDatabase}) => {
   
  if (!msg.member.roles.cache.some(r => cfg.Hammer.Other.includes(r.id)) && !msg.member.roles.cache.some(r => cfg.Hammer.ChatMute.includes(r.id)) && !msg.member.hasPermission(8)) return client.timemessage(client.yetersizYetki(msg, msg), msg.channel.id, 5000)
  if (!uye) return client.timemessage(client.normalEmbed(`Lütfen bir üyeyi etiketle ve tekrar dene!`, msg), msg.channel.id, 5000) 
  if (uye.user.bot)  return client.timemessage(client.normalEmbed(`Botlara herhangi bir işlem uygulayamazsın.`, msg), msg.channel.id, 5000)
  if(uye.id == (`${msg.author.id}`)) return client.timemessage(client.normalEMbed(`Kendine herhangi bir işlem uygulayamazsın.`, msg), msg.channel.id, 5000)
  if(!uye.roles.cache.has(cfg.Roles.Muted)) return client.timemessage(client.normalEmbed(`Belirttiğiniz kullanıcı veritabanında muteli gözükmüyor.`, msg), msg.channel.id, 5000)
  if(msg.member.roles.highest.position < uye.roles.highest.position) return client.timemessage(client.normalEmbed(`Mutesini kaldırmaya çalıştığın üye senle aynı yetkide veya senden üstün!`, msg), msg.channel.id, 5000)
  const CezaDatax2 = await CezaDatabase.findOne({ guildID: msg.guild.id, userID: uye.id, chatmuted: true})
  if (CezaDatax2 && CezaDatax2.chatmuted === false) { 
  client.timemessage(client.normalEmbed(`Kullanıcı bot ile mute yemememiş, sağ tık ile atılan mute kaldırıldı.`, msg), msg.channel.id, 5000)
  uye.roles.remove(cfg.Roles.Muted).catch(() => { })
  client.react(msg, "tick")
  client.channels.cache.get(cfg.Channels.ChatMute).send(new MessageEmbed().setColor("27d38a").setFooter(moment(Date.now()).locale("TR").format("LLL")).setAuthor(msg.author.tag, msg.author.avatarURL({ dynamic: true })).setDescription(`${uye} (\`${uye.id}\`) üyesinin metin kanallarında olan susturulması kaldırıldı.\n\n• Susturmayı açan yetkili ${msg.author} (\`${msg.author.id}\`)`))
  return}
  uye.roles.remove(cfg.Roles.Muted).catch(() => { })
  client.react(msg, "tick")
  let CezaData = await CezaDatabase.findOne({ guildID: cfg.Server.GuildID, userID: uye.id, chatmuted: true}) 
  CezaData.chatmuted = false
  CezaData.save()   
  client.channels.cache.get(cfg.Channels.ChatMute).send(new MessageEmbed().setColor("27d38a").setFooter(`Ceza Numarası: #${CezaData.cezaID}`).setAuthor(msg.author.tag, msg.author.avatarURL({ dynamic: true })).setDescription(`${uye} (\`${uye.id}\`) üyesinin metin kanallarında olan susturulma süresi bitmeden cezası kaldırıldı.`).addField(`**Mute Bilgisi**`, `• Yetkili <@!${CezaData.authorID}> (\`${CezaData.authorID}\`)\n• Mute Başlangıç \`${moment(CezaData.date).locale('TR').format('LLL')}\` (\`${moment(CezaData.date).locale('TR').fromNow()}\`)\n• Mute Bitiş \`${moment(CezaData.finishDate).locale('TR').format('LLL')}\` (\`${moment(CezaData.finishDate).locale('TR').fromNow()}\`)\n• Süre \`${CezaData.time}\`\n• Sebep \`${CezaData.Reason}\``))}}
