const humanizeDuration = require("humanize-duration")
module.exports = {
  conf: {
    aliases: ["kb","profil","kullanıcıinfo"],
    name: "kullanıcıbilgi",
    usage: 'kullanıcıbilgi [üye]',
    description: 'Belirttiğiniz kullanıcının hesabı hakkında detaylı bilgi alırsınız.',
},

 run: async ({client, msg, args, cfg, author, MessageEmbed, uye, moment, Discord, uyekontrol, CezapuanDatabase, CezaSayıDatabase, StaffDatabase}) => {
   
  const aylar = {"01": "Ocak","02": "Şubat","03": "Mart","04": "Nisan","05": "Mayıs","06": "Haziran","07": "Temmuz","08": "Ağustos","09": "Eylül","10": "Ekim","11": "Kasım","12": "Aralık"} 
  let user = msg.mentions.users.first() || msg.guild.members.cache.get(args[0]) || msg.author;
  const member = msg.guild.member(user);
  if(uyekontrol === "False") {
  if(args[0]) {
  let victim;
  try{if(args[0] instanceof Discord.GuildMember) { victim = args[0].user; }else if(args[0] instanceof Discord.User) { victim = args[0]; }else { victim = await client.users.fetch(args[0])}
  let oluşturma = `${moment(victim.createdAt).format('DD')} ${aylar[moment(victim.createdAt).format('MM')]} ${moment(victim.createdAt).format('YYYY')} ${moment(victim.createdAt).format('HH:mm')} (${humanizeDuration(Date.now() - victim.createdAt, {largest: 2, round: true}).replace("seconds", "saniye").replace("minute", "dakika").replace("minutes", "dakika").replace("hour", "saat").replace("hours", "saat").replace("day", "gün").replace("week", "hafta").replace("month", "ay").replace("year", "yıl").replace("haftas", "hafta").replace("güns", "gün").replace("ays", "ay").replace("yıls", "yıl").replace("dakikas", "dakika").replace("saats", "saat")} önce)`
  msg.channel.send(new MessageEmbed().addField(`❯ Kullanıcı Bilgisi`, `ID: ${victim.id}\n Profil: ${victim}\nOluşturulma: ${oluşturma}`).setAuthor(victim.tag, victim.avatarURL({dynamic:true})).setColor(client.vegasRenkler[Math.floor(Math.random() * client.vegasRenkler.length)]).setThumbnail(victim.avatarURL({dynamic: true})))
  }catch{{}}return}}
  let ad = msg.guild.members.cache.array();
  let üj = [];
  let max = (ad.length < msg.guild.memberCount) ? ad.length : msg.guild.memberCount;for(var i=0; i < max; i++) {var memberr = ad[i]; üj.push({memberr: memberr, sd: memberr, slm: memberr.joinedAt});};üj = üj.sort((a, b) => a.slm - b.slm);
  let nn = üj.map(a => a.sd); var i = 0;let sıra;nn.forEach(s => {i++
  if(s === member) sıra = i;});
  let CezapuanData = await CezapuanDatabase.findOne({ guildID: msg.guild.id, userID: member.id})
  let CezaSayıData = await CezaSayıDatabase.findOne({ guildID: msg.guild.id, userID: member.id})
  let StaffData = await StaffDatabase.findOne({ guildID: msg.guild.id, userID: member.id})
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
  let durum;if(totall > 101) durum = "Aşırı Güvensiz";if(totall === 101) durum = "Aşırı Güvensiz";if(totall < 100) durum = "Aşırı Tehlikeli";if(totall === 100) durum = "Aşırı Tehlikeli";if(totall === 71) durum = "Aşırı Tehlikeli";if(totall < 70) durum = "Tehlikeli";if(totall === 70) durum = "Tehlikeli";if(41 === totall) durum = "Tehlikeli";if(totall === 40) durum = "Şüpheli";if(totall < 40) durum = "Şüpheli";if(21 === totall) durum = "Şüpheli";if(totall < 20) durum = "Güvenli";if(20 === totall) durum = "Güvenli";if(totall === 1) durum = "Güvenli";if(totall == `0`) durum = "Çok Güvenli";
  let oluşturma = `${moment(member.user.createdAt).format('DD')} ${aylar[moment(member.user.createdAt).format('MM')]} ${moment(member.user.createdAt).format('YYYY')} ${moment(member.user.createdAt).format('HH:mm')} - (${humanizeDuration(Date.now() - member.user.createdAt, {largest: 2, round: true}).replace("seconds", "saniye").replace("minute", "dakika").replace("minutes", "dakika").replace("hour", "saat").replace("hours", "saat").replace("day", "gün").replace("week", "hafta").replace("month", "ay").replace("year", "yıl").replace("haftas", "hafta").replace("güns", "gün").replace("ays", "ay").replace("yıls", "yıl").replace("dakikas", "dakika").replace("saats", "saat")} önce)`
  let katılım = `${moment(member.joinedAt).format('DD')} ${aylar[moment(member.joinedAt).format('MM')]} ${moment(member.joinedAt).format('YYYY')} ${moment(member.joinedAt).format('HH:mm')} - (${humanizeDuration(Date.now() - member.joinedAt, {largest: 2, round: true}).replace("seconds", "saniye").replace("minute", "dakika").replace("minutes", "dakika").replace("hour", "saat").replace("hours", "saat").replace("day", "gün").replace("week", "hafta").replace("month", "ay").replace("year", "yıl").replace("haftas", "hafta").replace("güns", "gün").replace("ays", "ay").replace("yıls", "yıl").replace("dakikas", "dakika").replace("saats", "saat")} önce)`
  const durumm = (member.user.presence.status == "online" ? "<:online:743108736796852344>**Çevrimiçi**":  (member.user.presence.status == "offline" ? "<:grnmez:743108711811383388>**Çevrimdışı**": (member.presence.status == "idle" ? "<:bota:743108620677546127>**Boşta**": (member.presence.status == "dnd" ? "<:evrimd:743108648586182736>**Rahatsız Etmeyin** ": ("Görünmez")))))
  let oynuyor;if (member.user.presence.game) oynuyor = "\nOynuyor: " + member.user.presence.game.name;if (member.user.presence.game && member.user.presence.game.name === "Custom Status") oynuyor = "\nCustom Status: " + member.user.presence.game.state;if (member.user.presence.game && member.user.presence.game.name === "Spotify") oynuyor = "\nSpotify üzerinden dinliyor: " + member.user.presence.game.details + " - " + member.user.presence.game.state;if (member.user.presence.game && member.user.presence.game.name === "Twitch") oynuyor = "\nTwitch üzerinden izliyor: " + member.user.presence.game.details + " - " + member.user.presence.game.state;if (member.user.presence.game && member.user.presence.game.name === "YouTube") oynuyor = "\nYouTube üzerinden izliyor: " + member.user.presence.game.details + " - " + member.user.presence.game.state;
  let nick;
  if (member.user.username !== member.displayName) nick = member.displayName
  let flags = member.user.flags.toArray()
  let vgs = member.user.avatarURL({ dynamic: true });
  let uflags = flags.map(x => x.toString()).join(",");uflags = uflags.replace("HOUSE_BRAVERY", "<:bravery:778994107871657984>");uflags = uflags.replace("HOUSE_BALANCE","<:balance:778994335555125249>");uflags = uflags.replace("DISCORD_PARTNER","<:partner:778993868863045643>");uflags = uflags.replace("HYPESQUAD_EVENTS","<a:hype:778994625150844928>");uflags = uflags.replace("EARLY_SUPPORTER","<:early:778994947541565471>");uflags = uflags.replace("EARLY_VERIFIED_DEVELOPER","<:rozet:778993510493454357>");uflags = uflags.replace("HOUSE_BRILLIANCE","<:brilliance:778995167289016341>");uflags = uflags.replace("HYPESQUAD_EVENTS","<:event:793742157629882378>");uflags = uflags.replace("DISCORD_EMPLOYEE","<:staff:793742227347472395>");uflags = uflags.replace("BHUNTER_LEVEL_1","<:bughunter:793742513009721344>");uflags = uflags.replace("BHUNTER_LEVEL_2","<:bughunter2:793742468830855201>")
  if (flags == ""){uflags = "Rozet bulunamadı."}
  let sunucuda;
  if (msg.guild.members.cache.has(member === true)) sunucuda = "evet"
  let yetkiliBilgisii = ``;
  let yetkiliBilgisi = ``;
  if ((member.roles.cache.some(r => cfg.Hammer.BotCommands.includes(r.id)))||(member.roles.cache.some(r => cfg.Hammer.Ban.includes(r.id)))||(member.roles.cache.some(r => cfg.Hammer.VoiceMute.includes(r.id)))||(member.roles.cache.some(r => cfg.Hammer.ChatMute.includes(r.id)))||(member.roles.cache.some(r => cfg.Hammer.Jail.includes(r.id)))||(member.roles.cache.has(cfg.Roles.YöneticiRolü))||(member.hasPermission(8))){
  let erkek = StaffData && StaffData.erkekkayıt ? StaffData.erkekkayıt : 0
  let kız = StaffData && StaffData.kızkayıt ? StaffData.kızkayıt : 0
  let totalll = erkek+kız
  yetkiliBilgisii += `\`•\` Teyit Bilgisi: Toplam: **${totalll}** (**${erkek}** erkek, **${kız}** kız)\n`;};
  if ((member.roles.cache.some(r => cfg.Hammer.BotCommands.includes(r.id)))||(member.roles.cache.some(r => cfg.Hammer.Ban.includes(r.id)))||(member.roles.cache.some(r => cfg.Hammer.VoiceMute.includes(r.id)))||(member.roles.cache.some(r => cfg.Hammer.ChatMute.includes(r.id)))||(member.roles.cache.some(r => cfg.Hammer.Jail.includes(r.id)))||(member.roles.cache.has(cfg.Roles.YöneticiRolü))||(member.hasPermission(8))){
  let chatMuteee = StaffData && StaffData.chatmute ? StaffData.chatmute : 0
  let sesMuteee = StaffData && StaffData.voicemute ? StaffData.voicemute : 0
  let bannn = StaffData && StaffData.ban ? StaffData.ban : 0
  let jailll = StaffData && StaffData.jail ? StaffData.jail : 0
  let totalll = chatMuteee+sesMuteee+bannn+jailll;
  yetkiliBilgisi += `**❯ Yetkili Bilgisi**\n\`•\` Cezalandırma Bilgisi: Toplam: **${totalll}** (**${chatMuteee}** chat, **${sesMuteee}** ses mute, **${jailll}** jail, **${bannn}** ban)\n`;};
  let roller = member.roles.cache.size < 8 ? member.roles.cache.filter(r => r.name !== "@everyone").map(r => r).join(', ') : member.roles.cache.filter(r => r.name !== "@everyone").map(r => r).join(', ') + `, ${member.roles.cache.size - 7} daha...`
  const kullanıcıBilgi = new MessageEmbed().setColor(client.vegasRenkler[Math.floor(Math.random() * client.vegasRenkler.length)]).setThumbnail(member.user.avatarURL({dynamic: true})).setDescription(`**❯ Kullanıcı Bilgisi**\n\`•\` Rozetler:\n${vgs === null ? '' : vgs.includes('gif') ? `<a:nitrov3:831082227470696489>,` : ""}${member.user.premiumSinceTimestamp ? ` <:booster1:831082733345177610>,` : ""} ${uflags}\n\`•\` Hesap: ${member}\n\`•\` Kullanıcı ID: ${member.id}\n\`•\` Durum: ${(member.user.presence.status).replace("offline", ("<:grnmez:743108711811383388>")).replace("online", ("<:online:743108736796852344>")).replace("idle", ("<:bota:743108620677546127>")).replace("dnd", ("<:evrimd:743108648586182736>"))} ${member.user.presence.activities[0] ? member.user.presence.activities[0].name + ` ${(member.user.presence.activities[0].type)}`.replace("PLAYING", "Oynuyor").replace("STREAMING", "Yayında").replace("LISTENING", "Dinliyor").replace("WATCHING", "İzliyor").replace("CUSTOM_STATUS", "") : (member.user.presence.status).replace("offline", "Görünmez/Çevrimdışı").replace("online", "Çevrimiçi").replace("idle", "Boşta").replace("dnd", "Rahatsız Etmeyin")}\n\`•\` Kuruluş Tarihi: ${oluşturma}\n\n**❯ Sunucu Bilgisi** ${nick ? "\n\`•\` Sunucu İsmi: " + nick: ""} \n\`•\` Katılım Tarihi: ${katılım}\n\`•\` Katılım Sırası: ${(msg.guild.members.cache.filter(a => a.joinedTimestamp <= member.joinedTimestamp).size).toLocaleString()}/${(msg.guild.memberCount).toLocaleString()} \n\`•\` Katılım Bilgisi: ${nn[sıra-2] || 'Bilinmiyor'} > ${nn[sıra-1]} > ${nn[sıra] || 'Bilinmiyor'}\n\`•\` Cezaları: Toplam: **${total}** (**${jail}** jail, **${ban}** ban, **${chatMute}** chatmute - **${sesMute}** sesmute\n\`•\` Ceza Puanı: ${totall} (${durum})\n\`•\` Rolleri (${member.roles.cache.size - 1}): ${roller}\n\n${yetkiliBilgisi} ${yetkiliBilgisii}`)
  msg.channel.send(kullanıcıBilgi);}}
