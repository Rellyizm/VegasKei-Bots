module.exports = {
  conf: {
    aliases: ["cmute","mute","textmute","cm"],
    name: "chatmute",
    usage: 'chatmute [üye] [süre] [sebep]',
    description: 'Belirttiğiniz üyeye metin kanallarında mute atarsınız.',
},
  
 run: async ({client, msg, args, cfg, author, uye, MessageEmbed, ms, prefix, moment, CezaExtraRolesDatabase, CezaDatabase, CezapuanDatabase, CezaSayıDatabase, StaffDatabase, ControlsDatabase}) => {
   
  if (!msg.member.roles.cache.some(r => cfg.Hammer.Other.includes(r.id)) && !msg.member.roles.cache.some(r => cfg.Hammer.ChatMute.includes(r.id)) && !msg.member.hasPermission(8)) return client.timemessage(client.yetersizYetki(msg, msg), msg.channel.id, 5000)
  if (!uye) return client.timemessage(client.normalEmbed(`Lütfen bir üyeyi etiketle ve tekrar dene!`, msg), msg.channel.id, 5000)
  if (uye.user.bot)  return client.timemessage(client.normalEmbed(`Botlara herhangi bir işlem uygulayamazsın.`, msg), msg.channel.id, 5000)
  if (uye.id == (`${msg.author.id}`)) return client.timemessage(client.normalEmbed(`Kendine herhangi bir işlem uygulayamazsın.`, msg), msg.channel.id, 5000)
  if (msg.member.roles.highest.position < uye.roles.highest.position) return client.timemessage(client.normalEmbed(`Mute atmaya çalıştığın üye senle aynı yetkide veya senden üstün!`, msg), msg.channel.id, 5000)
  let timereplace = args[1];
  if(!timereplace || !ms(timereplace)) return client.timemessage(client.normalEmbed(`Lütfen tüm argümanları doğru giriniz!\nÖrnek Kullanım: ${prefix}chatmute {user} {süre} {sebep}`, msg), msg.channel.id, 5000)
  if (ms(args[1]) < ms("1m")) return client.timemessage(client.normalEmbed("Belirtilen susturma süresi geçerli değil.", msg), msg.channel.id, 5000)
  let time = timereplace.replace(/y/, ' yıl').replace(/d/, ' gün').replace(/s/, ' saniye').replace(/m/, ' dakika').replace(/h/, ' saat')
  let reason;
  if(!args[2]) reason = 'Sebep girilmedi.'
  if(args[2]) reason = args.slice(2).join(' ')
  const CezaDatax2 = await CezaDatabase.findOne({ guildID: msg.guild.id, userID: uye.id, chatmuted: true})
  if (CezaDatax2 && CezaDatax2.chatmuted === true) return client.timemessage(client.normalEmbed(`Bu kullanıcı veritabanında zaten muteli olarak gözüküyor.`, msg), msg.channel.id, 5000)
  let CezapuanData2 = await CezapuanDatabase.findOne({ guildID: msg.guild.id, userID: uye.id})
  let chatMutee = CezapuanData2 && CezapuanData2.cezapuanıchatmute ? CezapuanData2.cezapuanıchatmute : 0
  let sesMutee = CezapuanData2 && CezapuanData2.cezapuanıvoicemute ? CezapuanData2.cezapuanıvoicemute : 0
  let bann = CezapuanData2 && CezapuanData2.cezapuanıban ? CezapuanData2.cezapuanıban : 0
  let jaill = CezapuanData2 && CezapuanData2.cezapuanıjail ? CezapuanData2.cezapuanıjail : 0
  let VEGAS = chatMutee+sesMutee+bann+jaill;
  let count = await CezaDatabase.countDocuments().exec();
  count = count == 0 ? 1 : count + 1;   
  let durum;if(VEGAS > 201) durum = " 1h";if(VEGAS === 201) durum = "1h";if(VEGAS < 200) durum = "30m";if(VEGAS === 200) durum = "30m";if(100 === VEGAS) durum = "30m";if(VEGAS < 100) durum = "25m";if(VEGAS === 100) durum = "25m";if(VEGAS === 71) durum = "25m";if(VEGAS < 70) durum = "5m";if(VEGAS === 70) durum = "5m";if(41 === VEGAS) durum = "5m";if(VEGAS === 40) durum = "3m";if(VEGAS < 40) durum = "3m";if(21 === VEGAS) durum = "3m";if(VEGAS < 20) durum = "0";if(20 === VEGAS) durum = "0";if(VEGAS === 1) durum = "0";if(VEGAS == `0`) durum = "0";
  let durum2;if(VEGAS > 201) durum2 = " \`(+1 saat)\`";if(VEGAS === 201) durum2 = " \`(+1 saat)\`";if(VEGAS < 200) durum2 = " \`(+30 dakika)\`";if(VEGAS === 200) durum2 = " \`(+30 dakika)\`";if(100 === VEGAS) durum2 = " \`(+30 dakika)\``";if(VEGAS < 100) durum2 = " \`(+25 dakika)\`";if(VEGAS === 100) durum2 = " \`(+25 dakika)\`";if(VEGAS === 71) durum2 = " \`(+25 dakika)\`";if(VEGAS < 70) durum2 = " \`(+5 dakika)\`";if(VEGAS === 70) durum2 = " \`(+5 dakika)\`";if(41 === VEGAS) durum2 = " \`(+5 dakika)\`";if(VEGAS === 40) durum2 = " \`(+3 dakika)\`";if(VEGAS < 40) durum2 = " \`(+3 dakika)\`";if(21 === VEGAS) durum2 = " \`(+3 dakika)\`";if(VEGAS < 20) durum2 = "";if(20 === VEGAS) durum2 = "";if(VEGAS === 1) durum2 = "";if(VEGAS == `0`) durum2 = "";
  let qwe = durum.replace(/y/, ' yıl').replace(/d/, ' gün').replace(/s/, ' saniye').replace(/m/, ' dakika').replace(/h/, ' saat')
  let vgsx = ms(timereplace)
  let vgsxx = ms(durum)
  let vegasssssss = vgsxx + vgsx
  let vgss = require("humanize-duration")(vegasssssss, { language: "tr", round: true, conjunction: ", ", serialComma: false})
  var tarih2 = ms(timereplace)
  var tarih4 = ms(durum)
  var tarih3 = Date.now() + tarih2 + tarih4 
  msg.channel.send(`${uye} kişisi ${time}${durum2} boyunca metin kanallarında susturuldu. (Ceza Numarası: \`#${count}\`)`)
  client.react(msg, "tick")
  uye.roles.add(cfg.Roles.Muted)  
  await StaffDatabase.findOneAndUpdate({ guildID: msg.guild.id, userID: msg.author.id}, { $inc: { chatmute: 1 } }, { upsert: true })
  await CezaSayıDatabase.findOneAndUpdate({ guildID: msg.guild.id, userID: uye.id}, { $inc: { chatmute: 1 } }, { upsert: true });
  await CezapuanDatabase.findOneAndUpdate({ guildID: msg.guild.id, userID: uye.id}, { $inc: { cezapuanıchatmute: 8 } }, { upsert: true });
  let Ceza = await new CezaDatabase({guildID: msg.guild.id,authorID: msg.author.id,cezaID: count,userID: uye.id,time: vgss,date: Date.now(),chatmuted: true,finishDate: tarih3,Reason: reason,Type: "Chat Mute"}).save()
  let CezaData = await CezaSayıDatabase.findOne({ guildID: msg.guild.id, userID: uye.id})
  client.channels.cache.get(cfg.Channels.ChatMute).send(new MessageEmbed().setColor("27d38a").setFooter(`Ceza Numarası: #${count}`).setAuthor(msg.author.tag, msg.author.avatarURL({ dynamic: true })).setDescription(`${uye} (\`${uye.id}\`) üyesi metin kanallarında susturuldu.\n\n• Mute Başlangıç \`${moment(Date.now()).locale('TR').format('LLL')}\`\n• Mute Bitiş \`${moment(tarih3).locale('TR').format('LLL')}\`\n• Süre \`${time}\`${durum2}\n\n• Sebep \`${reason}\``)) 
  let CezapuanData = await CezapuanDatabase.findOne({ guildID: msg.guild.id, userID: uye.id})
  let chatMute = CezapuanData && CezapuanData.cezapuanıchatmute ? CezapuanData.cezapuanıchatmute : 0
  let sesMute = CezapuanData && CezapuanData.cezapuanıvoicemute ? CezapuanData.cezapuanıvoicemute : 0
  let ban = CezapuanData && CezapuanData.cezapuanıban ? CezapuanData.cezapuanıban : 0
  let jail = CezapuanData && CezapuanData.cezapuanıjail ? CezapuanData.cezapuanıjail : 0
  let toplam = chatMute+sesMute+ban+jail;
  client.channels.cache.get(cfg.Channels.Cezapuanı).send(`${uye}: aldığınız **#${count}** ID'li ceza ile **${toplam}** ceza puanına ulaştınız.`) 
  if(toplam >= 250) {
  await CezapuanDatabase.findOneAndUpdate({ guildID: msg.guild.id, userID: uye.id}, { $inc: { cezapuanı250sınırceza: 1 } }, { upsert: true });
  let kontrl = await CezapuanDatabase.findOne({ guildID: msg.guild.id, userID: uye.id});
  if(kontrl.cezapuanı250sınırceza >= 3) {
  let count = await CezaDatabase.countDocuments().exec();
  count = count == 0 ? 1 : count + 1;   
  let bitişayc = moment(Date.now()+259200000).format("MM");
  let jailbitiş = `${moment(Date.now()+259200000).format("DD")} ${bitişayc.replace("01", "Ocak").replace("02", "Şubat").replace("03", "Mart").replace("04", "Nisan").replace("05", "Mayıs").replace("06", "Haziran").replace("07", "Temmuz").replace("08", "Ağustos").replace("09", "Eylül").replace("10", "Ekim").replace("11", "Kasım").replace("12", "Aralık")} ${moment(Date.now()+259200000).format("YYYY")} ${moment(Date.now()+259200000).format("HH:mm")}`;
  await CezapuanDatabase.findOneAndUpdate({ guildID: msg.guild.id, userID: uye.id}, { $set: { cezapuanı250sınırceza: 0 } }, { upsert: true }); 
  uye.roles.cache.has(cfg.Roles.BoosterRolü) ?  uye.roles.set([cfg.Roles.BoosterRolü, cfg.Roles.CezalıRolü]) : uye.roles.set([cfg.Roles.CezalıRolü])
  let CezaExtraRolesData = await CezaExtraRolesDatabase.findOne({ guildID: msg.guild.id, userID: uye.id})
  let memberRoles = uye.roles.cache.map(x => x.id)
  if(!CezaExtraRolesData) {let newCezaa = new CezaExtraRolesDatabase({guildID: msg.guild.id, userID: uye.id, roles: memberRoles}).save();} else{
  CezaExtraRolesData.roles.push(memberRoles); 
  CezaExtraRolesData.save();}
  await StaffDatabase.findOneAndUpdate({ guildID: msg.guild.id, userID: msg.author.id}, { $inc: { jail: 1 } }, { upsert: true })
  await CezaSayıDatabase.findOneAndUpdate({ guildID: msg.guild.id, userID: uye.id}, { $inc: { jail: 1 } }, { upsert: true });
  await CezapuanDatabase.findOneAndUpdate({ guildID: msg.guild.id, userID: uye.id}, { $inc: { cezapuanıjail: 15 } }, { upsert: true });
  let Ceza = await new CezaDatabase({guildID: msg.guild.id,authorID: msg.author.id,cezaID: count,userID: uye.id,jail3days: true,time: 259200000,date: Date.now(),finishDate: Date.now()+259200000,Reason: "+ 250 Cezapuanı",Type: "Jail"}).save()
  let CezapuanData = await CezapuanDatabase.findOne({ guildID: msg.guild.id, userID: uye.id})
  let chatMute = CezapuanData && CezapuanData.cezapuanıchatmute ? CezapuanData.cezapuanıchatmute : 0
  let sesMute = CezapuanData && CezapuanData.cezapuanıvoicemute ? CezapuanData.cezapuanıvoicemute : 0
  let ban = CezapuanData && CezapuanData.cezapuanıban ? CezapuanData.cezapuanıban : 0
  let jail = CezapuanData && CezapuanData.cezapuanıjail ? CezapuanData.cezapuanıjail : 0
  let toplam = chatMute+sesMute+ban+jail;
  msg.channel.send(`${uye} üyesinin cezapuanı **+ 250** olduğu için **3 gün** boyunca cezalıya attım.`)
  client.channels.cache.get(cfg.Channels.Jail).send(new MessageEmbed().setColor("27d38a").setFooter(`Ceza Numarası: #${count}`).setAuthor(msg.author.tag, msg.author.avatarURL({ dynamic: true })).setDescription(`${uye} (\`${uye.id}\`) üyesi geçici olarak karantinaya atıldı.\n\n• Karantina Başlangıç \`${moment(Date.now()).locale("TR").format("LLL")}\`\n• Karantina Bitiş \`${jailbitiş}\`\n• Süre \`3 gün\`\n\n• Sebep \`+ 250 Cezapuanı\``))    
  client.channels.cache.get(cfg.Channels.Cezapuanı).send(`${uye}: aldığınız **#${count}** ID'li ceza ile **${toplam}** ceza puanına ulaştınız.`)
  return}return}}}
