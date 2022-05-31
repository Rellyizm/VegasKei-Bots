module.exports = {
  conf: {
    aliases: ["voiceunmute","sesunmute","sesliunmute"],
    name: "vunmute",
    usage: 'vunmute [üye]',
    description: 'Belirttiğiniz kullanıcının ses kanallarında olan susturulmasını açarsınız. (Kullanıcıya Bot İle Mute Atılmadıysa da Susturulmasını Kaldırabilirsiniz.)',
  },

 run: async ({client, msg, args, cfg, author, guild, moment, MessageEmbed, uye, CezaDatabase, VoiceUnmuteDatabase, ControlsDatabase, VoiceMuteDatabase}) => {
   
  if (!msg.member.roles.cache.some(r => cfg.Hammer.Other.includes(r.id)) && !msg.member.roles.cache.some(r => cfg.Hammer.VoiceMute.includes(r.id)) && !msg.member.hasPermission(8)) return client.timemessage(client.yetersizYetki(msg, msg), msg.channel.id, 5000)
  if (!uye) return client.timemessage(client.normalEmbed(`Lütfen bir üyeyi etiketle ve tekrar dene!`, msg), msg.channel.id, 5000)
  if (uye.user.bot)  return client.timemessage(client.normalEmbed(`Botlara herhangi bir işlem uygulayamazsın.`, msg), msg.channel.id, 5000)
  if (uye.id == (`${msg.author.id}`)) return client.timemessage(client.normalEmbed(`Kendine herhangi bir işlem uygulayamazsın.`, msg), msg.channel.id, 5000)
  if (msg.member.roles.highest.position < uye.roles.highest.position) return client.timemessage(client.normalEmbed(`Mutesini kaldırmaya çalıştığın üye senle aynı yetkide veya senden üstün!`, msg), msg.channel.id, 5000)
  if (uye.voice.serverMute == false) return client.timemessage(client.normalEmbed(`Bu kullanıcı ses kanallarında muteli olarak gözükmüyor.`, msg), msg.channel.id, 5000)
  const CezaDatax2 = await CezaDatabase.findOne({ guildID: msg.guild.id, userID: uye.id, voicemuted: true})
  if (CezaDatax2 && CezaDatax2.voicemuted === false) {
  client.timemessage(client.normalEmbed(`Kullanıcı bot ile mute yemememiş, sağ tık ile atılan mute kaldırıldı.`, msg), msg.channel.id, 5000)
  uye.voice.setMute(false) 
  client.react(msg, "tick")
  client.channels.cache.get(cfg.Channels.VoiceMute).send(new MessageEmbed().setColor("27d38a").setFooter(moment(Date.now()).locale("TR").format("LLL")).setAuthor(msg.author.tag, msg.author.avatarURL({ dynamic: true })).setDescription(`${uye} (\`${uye.id}\`) üyesinin ses kanallarında olan susturulması kaldırıldı.\n\n• Susturmayı açan yetkili ${msg.author} (\`${msg.author.id}\`)`))
  return}
  client.react(msg, "tick")
  let CezaData = await CezaDatabase.findOne({ guildID: cfg.Server.GuildID, userID: uye.id, voicemuted: true}) 
  CezaData.voicemuted = false
  CezaData.save()
  if(uye.voice.channel == undefined) {
  await VoiceUnmuteDatabase.findOneAndUpdate({ guildID: msg.guild.id, userID: uye.id, authorID: uye.id}, { $set: { unmutedurum: "Kaldırılamadı"} }, { upsert: true })
  let VoiceMuteData = await VoiceMuteDatabase.findOne({ guildID: msg.guild.id, userID: uye.id})  
  if(VoiceMuteData) {VoiceMuteData.delete()}
  client.channels.cache.get(cfg.Channels.VoiceMute).send(new MessageEmbed().setColor("27d38a").setFooter(`Ceza Numarası: #${CezaData.cezaID}`).setAuthor(msg.author.tag, msg.author.avatarURL({ dynamic: true })).setDescription(`${uye} (\`${uye.id}\`) üyesinin susturulması sesli bir kanalda bulunmadığı için kaldırılamadı. Bir kanala giriş yapınca kaldırılacak.`).addField(`**Mute Bilgisi**`, `• Yetkili <@!${CezaData.authorID}> (\`${CezaData.authorID}\`)\n• Mute Başlangıç \`${moment(CezaData.date).locale('TR').format('LLL')}\` (\`${moment(CezaData.date).locale('TR').fromNow()}\`)\n• Mute Bitiş \`${moment(CezaData.finishDate).locale('TR').format('LLL')}\` (\`${moment(CezaData.finishDate).locale('TR').fromNow()}\`)\n• Süre \`${CezaData.time}\`\n• Sebep \`${CezaData.Reason}\``)) 
  } else if(uye.voice.channel) {uye.voice.setMute(false)
  let VoiceMuteData = await VoiceMuteDatabase.findOne({ guildID: msg.guild.id, userID: uye.id})  
  if(VoiceMuteData) {VoiceMuteData.delete()}
  client.channels.cache.get(cfg.Channels.VoiceMute).send(new MessageEmbed().setColor("27d38a").setFooter(`Ceza Numarası: #${CezaData.cezaID}`).setAuthor(msg.author.tag, msg.author.avatarURL({ dynamic: true })).setDescription(`${uye} (\`${uye.id}\`) üyesinin sesli susturulma süresi bitmeden cezası kaldırıldı.`).addField(`**Mute Bilgisi**`, `• Yetkili <@!${CezaData.authorID}> (\`${CezaData.authorID}\`)\n• Mute Başlangıç \`${moment(CezaData.date).locale('TR').format('LLL')}\` (\`${moment(CezaData.date).locale('TR').fromNow()}\`)\n• Mute Bitiş \`${moment(CezaData.finishDate).locale('TR').format('LLL')}\` (\`${moment(CezaData.finishDate).locale('TR').fromNow()}\`)\n• Süre \`${CezaData.time}\`\n• Sebep \`${CezaData.Reason}\``))}}}
