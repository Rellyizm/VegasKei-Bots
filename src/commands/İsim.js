module.exports = {
  conf: {
    aliases: ["nick","i"],
    name: "isim",
    usage: 'isim [üye] [isim] [yaş]',
    description: 'Belirttiğiniz kullanıcının ismini değiştirirsiniz. (36 Üstü Yaş Kabul Edilmiyor, Kullanıcının Hesabı 7 Günden Önce Açıldıysa İsim Değiştirme Gerçekleştirilemez, Kullanıcının Ceza Puanı 40 Üstü İse İsim Değiştirme Gerçekleştirilemez, Kullanıcının İsminin İlk Harfini Küçük Yapsanızda Bot İlk Harfi Büyük Olarak Değiştirir Ve Girdiğiniz İsim Eğer Düzgün Değilse Bot Düzeltip İsmi Değiştirir.)',
 },

 run: async ({client, msg, args, cfg, prefix, author, guild, MessageEmbed, uye, StaffDatabase, CezaSayıDatabase, CezapuanDatabase, YetkiliKayıtDatabase, RegisterDatabase, ControlsDatabase}) => {
   
  if (!msg.member.roles.cache.some(r => cfg.Hammer.Other.includes(r.id)) && !msg.member.roles.cache.some(r => cfg.Hammer.BotCommands.includes(r.id)) && !msg.member.hasPermission(8)) return client.timemessage(client.yetersizYetki(msg, msg), msg.channel.id, 5000)
  if (!uye) return client.timemessage(client.normalEmbed(`Lütfen bir üyeyi etiketle ve tekrar dene!`, msg), msg.channel.id, 5000)
  if (uye.user.bot)  return client.timemessage(client.normalEmbed(`Botlara herhangi bir işlem uygulayamazsın.`, msg), msg.channel.id, 5000)
  if (uye.id == (`${msg.author.id}`)) return client.timemessage(client.normalEmbed(`Kendine herhangi bir işlem uygulayamazsın.`, msg), msg.channel.id, 5000)
  if (!uye) return client.timemessage(client.normalEmbed(`Lütfen tüm argümanları doğru giriniz!\nÖrnek Kullanım: !isim {user} {isim} {yaş}`, msg), msg.channel.id, 5000)
  let isim = args.slice(1).join(' ')
  if(!msg.member.hasPermission(8)) {
  let zaman = Date.now() - uye.user.createdAt.getTime();
  if (zaman < 604800000) {return client.message(client.normalEmbed(`Bu üyenin hesabı ${client.format(zaman)} önce açıldığı için isim değiştirme gerçekleştirilemedi.`, msg), msg.channel.id)
  await StaffDatabase.findOneAndUpdate({ guildID: msg.guild.id, userID: msg.author.id}, { $inc: { fakekayıt: 1 } }, { upsert: true })} 
  let CezapuanData = await CezapuanDatabase.findOne({ guildID: msg.guild.id, userID: uye.id})
  let CezaSayıData = await CezaSayıDatabase.findOne({ guildID: msg.guild.id, userID: uye.id})
  let chatMute = CezaSayıData && CezaSayıData.chatmute ? CezaSayıData.chatmute : 0
  let sesMute = CezaSayıData && CezaSayıData.voicemute ? CezaSayıData.voicemute : 0
  let ban = CezaSayıData && CezaSayıData.ban ? CezaSayıData.ban : 0
  let jail = CezaSayıData && CezaSayıData.jail ? CezaSayıData.jail : 0
  let total = chatMute+sesMute+ban+jail;
  let chatMutee = CezapuanData && CezapuanData.cezapuanıchatmute ? CezapuanData.cezapuanıchatmute : 0
  let sesMutee = CezapuanData && CezapuanData.cezapuanıvoicemute ? CezapuanData.cezapuanıvoicemute : 0
  let bann = CezapuanData && CezapuanData.cezapuanıban ? CezapuanData.cezapuanıban : 0
  let jaill = CezapuanData && CezapuanData.cezapuanıjail ? CezapuanData.cezapuanıjail : 0
  let totall = chatMutee+sesMutee+bann+jaill;
  if(totall > `40`) {return client.message(client.normalEmbed(`Bu üyenin ceza puanı **${totall}** Bu sebepten ötürü üyenin isim değiştirme gerçekleştirilemedi.\n\nBelirtilen üye toplamda **${total}** ceza yemiş. **${jail}** Jail, **${chatMute}** Mute, **${sesMute}** Sesmute, **${ban}** Ban`, msg), msg.channel.id)}}
  let RegisterData = await RegisterDatabase.findOne({ guildID: msg.guild.id, userID: uye.id})
  let isimlerkız = RegisterData && RegisterData.isimlerkız ? RegisterData.isimlerkız : 0
  let isimlererkek = RegisterData && RegisterData.isimlererkek ? RegisterData.isimlererkek : 0
  let isimlerayrılma = RegisterData && RegisterData.isimlerayrılma ? RegisterData.isimlerayrılma : 0
  let totalisimler = isimlererkek + isimlerkız + isimlerayrılma
  let isims;
  if(!(RegisterData && RegisterData.isimler)) isims = "Kullanıcının veri tabanında eski isim kayıtı bulunamadı.\n"
  else isims = RegisterData.isimler.map(x => `${x.isimler}`).slice(0, 10).join(" • ")
  await uye.setNickname(`• ${isim.charAt(0).replace('i', "İ").toUpperCase() + isim.slice(1).toLowerCase()} Wénc`).catch(() => { })
  
  await YetkiliKayıtDatabase.findOneAndUpdate({ guildID: msg.guild.id, authorID: msg.author.id}, { $set: { userID: ""+uye.id+"", mod: true} }, { upsert: true })
  client.message(client.normalEmbed(`${totalisimler ? `${uye} kişisinin ismi başarıyla "${isim.charAt(0).replace('i', "İ").toUpperCase() + isim.slice(1).toLowerCase()} Wénc" olarak değiştirildi, bu üye daha önce bu isimler ile kayıt olmuş.\n\nKişinin toplamda **${totalisimler}** isim kayıtı bulundu.\n• ${isims}\n Kişinin önceki isimlerine \`${prefix}isimler @üye\` komutuyla bakarak kayıt işlemini gerçekleştirmeniz önerilir.`: `${uye} üyesinin ismi başarıyla ${isim.charAt(0).replace('i', "İ").toUpperCase() + isim.slice(1).toLowerCase()} Wénc olarak değiştirildi`}`, msg), msg.channel.id)}}
