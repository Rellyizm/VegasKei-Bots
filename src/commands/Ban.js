module.exports = {
  conf: {
    aliases: ["yargı","idam","yak"],
    name: "ban",
    usage: 'ban [üye] [sebep]',
    description: 'Belirttiğiniz kullanıcı banlarsınız. (Yarım Saat 5 Ban Atabilme Hakkınız Vardır, Sunucu da Olmayan Birisine De Ban Atabilirsiniz.)',
  },
 run: async ({client, msg, args, cfg, Discord, uye, MessageEmbed, moment, guild, uyekontrol, CezaDatabase, CezapuanDatabase, CezaSayıDatabase, BanInfoDatabase, StaffDatabase, ControlsDatabase}) => {
   
  if (!msg.member.roles.cache.some(r => cfg.Hammer.Other.includes(r.id)) && !msg.member.roles.cache.some(r => cfg.Hammer.Ban.includes(r.id)) && !msg.member.hasPermission(8)) return client.timemessage(client.yetersizYetki(msg, msg), msg.channel.id, 5000)
  let sebep = args.slice(1).join(' ');
  if(!sebep) sebep = 'Sebep belirtilmemiş.'
  let banlılar = await msg.guild.fetchBans();
  if(banlılar.get(args[0])) return client.timemessage(client.normalEmbed(`Belirttiğiniz kullanıcı zaten banlanmış!`,msg), msg.channel.id, 5000)
  if(!args[0]) return client.timemessage(client.normalEmbed(`Lütfen bir üyeyi etiketle ve tekrar dene!`,msg), msg.channel.id, 5000)
  if(uyekontrol === "False") {
  let victim;
  if(args[0] instanceof Discord.GuildMember) { victim = args[0].user; }else if(args[0] instanceof Discord.User) { victim = args[0]; }else { victim = await client.users.fetch(args[0])} 
  if(banlılar.get(args[0])) return client.timemessage(client.normalEmbed(`${victim.tag} kullanıcısı zaten yasaklanmış durumda.`,msg), msg.channel.id, 5000)
  let StaffData = await StaffDatabase.findOne({ guildID: msg.guild.id, userID: msg.author.id})
  let banLimit = StaffData && StaffData.banlimit ? StaffData.banlimit : 0
  if (banLimit >= 5) {
  client.message(client.normalEmbed(`Gün içerisinde çok fazla ban işlemi uyguladığınız için komut geçici olarak kullanımınıza kapatılmıştır.`, msg), msg.channel.id)
  client.channels.cache.get(cfg.Channels.Ban).send(client.normalEmbed(`${msg.author} (\`${msg.author.tag.replace("`","")}\` - \`${msg.author.id}\`) adlı yetkili 30 dakikada 5 tane ban attığı için ban yetkisi alındı.`)).catch(() => { })
  msg.member.roles.remove(cfg.Hammer.BanHammer).catch(() => { })
  await StaffDatabase.findOneAndUpdate({ guildID: msg.guild.id, userID: msg.author.id}, { $set: { banlimit: 0 } }, { upsert: true });;return;} 
  let count = await CezaDatabase.countDocuments().exec();
  count = count == 0 ? 1 : count + 1;   
  msg.guild.members.ban(victim.id, {reason: `${sebep}`})
  let VegasEmbedx1 = new MessageEmbed().setAuthor(msg.author.tag, msg.author.avatarURL({dynamic:true})).setDescription(`**${victim.tag.replace("`","")}** kullanıcısı **${msg.author.tag.replace("`","")}** tarafından başarıyla sunucudan yasaklandı. (Ceza Numarası: \`#${count}\`)`).setColor(client.vegasRenkler[Math.floor(Math.random() * client.vegasRenkler.length)]).setImage(cfg.GifPp.BanGif)
  msg.channel.send(VegasEmbedx1)
  await StaffDatabase.findOneAndUpdate({ guildID: msg.guild.id, userID: msg.author.id}, { $inc: { ban: 1 } }, { upsert: true })
  if (msg.member.hasPermission(8)) { await StaffDatabase.findOneAndUpdate({ guildID: msg.guild.id, userID: msg.author.id}, { $inc: { banlimit: 1 } }, { upsert: true })};
  let Ceza = await new CezaDatabase({guildID: msg.guild.id,authorID: msg.author.id,cezaID: count,userID: victim.id,time: "",date: Date.now(),finishDate: 0,Reason: sebep,Type: "Ban", ban: true}).save()
  await CezapuanDatabase.findOneAndUpdate({ guildID: msg.guild.id, userID: victim.id}, { $inc: { cezapuanıban: 10 } }, { upsert: true });
  let CezapuanData = await CezapuanDatabase.findOne({ guildID: msg.guild.id, userID: victim.id})
  await CezaSayıDatabase.findOneAndUpdate({ guildID: msg.guild.id, userID: victim.id}, { $inc: { ban: 1 } }, { upsert: true });
  client.channels.cache.get(cfg.Channels.Ban).send(new MessageEmbed().setColor("27d38a").setFooter(`Ceza Numarası: #${count}`).setAuthor(msg.author.tag, msg.author.avatarURL({ dynamic: true })).setDescription(`**${victim.tag.replace("`","")}** (\`${victim.id}\`) üyesi sunucudan yasaklandı!\n\n• Yasaklayan Yetkili ${msg.author} (\`${msg.author.id}\`)\n• Yasaklanma Sebebi \`${sebep}\`\n• Yasaklanma Tarihi \`${moment(Date.now()).locale('TR').format('LLL')}\``))
  let chatMute = CezapuanData && CezapuanData.cezapuanıchatmute ? CezapuanData.cezapuanıchatmute : 0
  let sesMute = CezapuanData && CezapuanData.cezapuanıvoicemute ? CezapuanData.cezapuanıvoicemute : 0
  let ban = CezapuanData && CezapuanData.cezapuanıban ? CezapuanData.cezapuanıban : 0
  let jail = CezapuanData && CezapuanData.cezapuanıjail ? CezapuanData.cezapuanıjail : 0
  let toplam = chatMute+sesMute+ban+jail;
  client.channels.cache.get(cfg.Channels.Cezapuanı).send(`${victim.tag}: aldığınız **#${count}** ID'li ceza ile **${toplam}** ceza puanına ulaştınız.`)
  if(toplam >= 250) {await CezapuanDatabase.findOneAndUpdate({ guildID: msg.guild.id, userID: victim.id}, { $inc: { cezapuanı250sınırceza: 1 } }, { upsert: true });}return}
  if(uye.hasPermission(8)) return client.timemessage(client.normalEmbed(`Yöneticileri Banlayamazsın.`,msg), msg.channel.id, 5000)
  if(uye.user.bot)  return client.timemessage(client.normalEmbed(`Botlara herhangi bir işlem uygulayamazsın.`,msg), msg.channel.id, 5000)
  if(msg.member.roles.highest.position < uye.roles.highest.position) return client.timemessage(client.normalEmbed(`Banlamaya çalıştığın üye senle aynı yetkide veya senden üstün.`,msg), msg.channel.id, 5000)
  if(msg.author.id === uye.user.id) return client.timemessage(client.normalEmbed(`Kendine herhangi bir işlem uygulayamazsın.`,msg), msg.channel.id, 5000)
  if(uye.roles.cache.has(cfg.Roles.BoosterRolü)) return client.timemessage(client.normalEmbed(`Belirttiğin Kullanıcı **Booster** Olduğu İçin Banlayamazsın.`,msg), msg.channel.id, 5000)
  let StaffData = await StaffDatabase.findOne({ guildID: msg.guild.id, userID: msg.author.id})
  let banLimit = StaffData && StaffData.banlimit ? StaffData.banlimit : 0
  if (banLimit >= 5) {
  client.message(client.normalEmbed(`Gün içerisinde çok fazla ban işlemi uyguladığınız için komut geçici olarak kullanımınıza kapatılmıştır.`, msg), msg.channel.id)    
  client.channels.cache.get(cfg.Channels.Ban).send(client.normalEmbed(`${msg.author} (\`${msg.author.tag.replace("`","")}\` - \`${msg.author.id}\`) adlı yetkili 30 dakikada 5 tane ban attığı için ban yetkisi alındı.`)).catch(() => { })
  msg.member.roles.remove(cfg.Hammer.BanHammer).catch(() => { })
  await StaffDatabase.findOneAndUpdate({ guildID: msg.guild.id, userID: msg.author.id}, { $set: { banlimit: 0 } }, { upsert: true });;return;} 
  let count = await CezaDatabase.countDocuments().exec();
  count = count == 0 ? 1 : count + 1;  
  msg.guild.members.ban(uye.id, {reason: `${sebep}`})
  let VegasEmbedx1 = new MessageEmbed().setAuthor(msg.author.tag, msg.author.avatarURL({dynamic:true})).setDescription(`**${uye.user.tag.replace("`","")}** kullanıcısı **${msg.author.tag.replace("`","")}** tarafından başarıyla sunucudan yasaklandı. (Ceza Numarası: \`#${count}\`)`).setColor(client.vegasRenkler[Math.floor(Math.random() * client.vegasRenkler.length)]).setImage(cfg.GifPp.BanGif)
  msg.channel.send(VegasEmbedx1)
  await StaffDatabase.findOneAndUpdate({ guildID: msg.guild.id, userID: msg.author.id}, { $inc: { ban: 1 } }, { upsert: true })
  if (!msg.member.hasPermission(8)) { await StaffDatabase.findOneAndUpdate({ guildID: msg.guild.id, userID: msg.author.id}, { $inc: { banlimit: 1 } }, { upsert: true })};
  let Ceza = await new CezaDatabase({guildID: msg.guild.id,authorID: msg.author.id,cezaID: count,userID: uye.id,time: "-",date: Date.now(),finishDate: 0 ,Reason: sebep,Type: "Ban", ban: true}).save()
  await CezapuanDatabase.findOneAndUpdate({ guildID: msg.guild.id, userID: uye.id}, { $inc: { cezapuanıban: 10 } }, { upsert: true });
  let CezapuanData = await CezapuanDatabase.findOne({ guildID: msg.guild.id, userID: uye.id})
  await CezaSayıDatabase.findOneAndUpdate({ guildID: msg.guild.id, userID: uye.id}, { $inc: { ban: 1 } }, { upsert: true });
  client.channels.cache.get(cfg.Channels.Ban).send(new MessageEmbed().setColor("27d38a").setFooter(`Ceza Numarası: #${count}`).setAuthor(msg.author.tag, msg.author.avatarURL({ dynamic: true })).setDescription(`**${uye.user.tag.replace("`","")}** (\`${uye.user.id}\`) üyesi sunucudan yasaklandı.\n\n• Yasaklayan Yetkili ${msg.author} (\`${msg.author.id}\`)\n• Yasaklanma Sebebi \`${sebep}\`\n• Yasaklanma Tarihi \`${moment(Date.now()).locale('TR').format('LLL')}\``))
  let chatMute = CezapuanData && CezapuanData.cezapuanıchatmute ? CezapuanData.cezapuanıchatmute : 0
  let sesMute = CezapuanData && CezapuanData.cezapuanıvoicemute ? CezapuanData.cezapuanıvoicemute : 0
  let ban = CezapuanData && CezapuanData.cezapuanıban ? CezapuanData.cezapuanıban : 0
  let jail = CezapuanData && CezapuanData.cezapuanıjail ? CezapuanData.cezapuanıjail : 0
  let toplam = chatMute+sesMute+ban+jail;
  client.channels.cache.get(cfg.Channels.Cezapuanı).send(`${uye}: aldığınız **#${count}** ID'li ceza ile **${toplam}** ceza puanına ulaştınız.`)
  if(toplam >= 250) {await CezapuanDatabase.findOneAndUpdate({ guildID: msg.guild.id, userID: uye.id}, { $inc: { cezapuanı250sınırceza: 1 } }, { upsert: true });}return}}
