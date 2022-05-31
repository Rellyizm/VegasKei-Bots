module.exports = {
  conf: {
    aliases: ["e","adam"],
    name: "erkek",
    usage: 'erkek [üye]',
    description: 'Belirttiğiniz üyeyi erkek olarak kayıt edersiniz.',
  },

 run: async ({client, msg, args, cfg, author, MessageEmbed, Puan, guild, CoinDatabase, YetkiliKayıtDatabase, CezapuanDatabase, CezaSayıDatabase, ControlsDatabase, RegisterDatabase, StaffDatabase, görevDatabase}) => {
 
  if (!msg.member.roles.cache.some(r => cfg.Hammer.Other.includes(r.id)) && !msg.member.roles.cache.some(r => cfg.Hammer.BotCommands.includes(r.id)) &&!msg.member.hasPermission(8)) return client.timemessage(client.yetersizYetki(msg, msg), msg.channel.id, 5000)                              
  try {const StaffData = await StaffDatabase.findOne({ guildID: msg.guild.id, userID: msg.author.id}); 
  const ControlsData = await ControlsDatabase.findOne({ guildID: msg.guild.id}); 
  let YetkiliKayıtData = await YetkiliKayıtDatabase.findOne({ guildID: msg.guild.id, authorID: msg.author.id})
  let vegas = msg.mentions.members.first() || msg.guild.members.cache.get(args[0]) || msg.guild.members.cache.get(YetkiliKayıtData.userID);
  if (vegas.user.bot) return client.timemessage(client.normalEmbed(`Botlara herhangi bir işlem uygulayamazsın.`, msg), msg.channel.id, 5000)
  if (vegas.id == (`${msg.author.id}`)) return client.timemessage(client.normalEmbed(`Kendine herhangi bir işlem uygulayamazsın.`, msg), msg.channel.id, 5000)
  if (vegas.roles.cache.some(r => cfg.Roles.Erkek.includes(r.id))) return client.timemessage(client.normalEmbed(`Zaten kayıt edilmiş bir kullanıcıyı kayıt edemezsin. Eğer ki yanlış kayıt işlemi gerçekleştirdiysen <@&${cfg.Roles.YöneticiRolü}> rolündeki yetkililere ulaş.`, msg), msg.channel.id, 10000)
  if (msg.member.roles.highest.position < vegas.roles.highest.position) return client.timemessage(client.normalEmbed(`Kaydetmeye çalıştığın üye senle aynı yetkide veya senden üstün.`,msg), msg.channel.id, 5000)
  let CezapuanData = await CezapuanDatabase.findOne({ guildID: msg.guild.id, userID: vegas.id})
  let CezaSayıData = await CezaSayıDatabase.findOne({ guildID: msg.guild.id, userID: vegas.id})
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
  if(!msg.member.hasPermission(8)) {
  if(ControlsData && ControlsData.taglıalım === "Açık") {
  if(!vegas.roles.cache.has(cfg.Roles.Vip) && !vegas.roles.cache.has(cfg.Roles.BoosterRolü) && !cfg.Tag.Tags.some(x => vegas.user.tag.includes(x))) return client.message(client.normalEmbed(`<a:juq_red:859049107339083786> Sunucumuz **tagsız** alımlara kapalıdır. Kayıt işlemini yapabilmeniz için kullanıcının tagımızı (\`${cfg.Tag.Tag}\`) alması gerekmektedir.`, msg), msg.channel.id) 
  }}
  if(!msg.member.hasPermission(8)) {
  if(totall > `40`) {return client.timemessage(client.normalEmbed(`🚫 Bu üyenin ceza puanı **${totall}** Bu sebepten ötürü kayıt işlemi iptal edildi.Sunucumuzda tüm işlemlerin kayıt altına alındığını unutmayın.Sorun teşkil eden, sunucunun huzurunu bozan ve kurallara uymayan kullanıcılar sunucumuza kayıt olamazlar.\n\nEğer konu hakkında bir şikayetiniz var ise <@&${cfg.Roles.YöneticiRolü}> rolü ve üstlerine ulaşabilirsiniz.`, msg), msg.channel.id, 10000)}
  let zaman = Date.now() - vegas.user.createdAt.getTime();
  if (zaman < 604800000) {return client.timemessage(client.normalEmbed(`Bu üyenin hesabı ${client.format(zaman)} önce açıldığı için kaydı gerçekleştirelemedi.`, msg), msg.channel.id, 10000)
  await StaffDatabase.findOneAndUpdate({ guildID: msg.guild.id, userID: msg.author.id}, { $inc: { fakekayıt: 1 } }, { upsert: true })}}  
  if(vegas.roles.cache.has(cfg.Roles.NewAccRole) && vegas.roles.cache.has(cfg.Roles.YasaklıTagRolü) && vegas.roles.cache.has(cfg.Roles.CezalıRolü) && vegas.roles.cache.some(r => cfg.Roles.Kız.includes(r.id))){
  await vegas.roles.remove(cfg.Roles.Kız) 
  await vegas.roles.remove(cfg.Roles.YasaklıTagRolü) 
  await vegas.roles.remove(cfg.Roles.CezalıRolü)
  await vegas.roles.remove(cfg.Roles.NewAccRole)}
  await vegas.roles.remove(cfg.Roles.KayıtsızRolü)
  await vegas.roles.add(cfg.Roles.Erkek)

  if (vegas.user.username.toLowerCase().includes("wenc") || vegas.user.username.toLowerCase().includes("wénc") || vegas.user.discriminator === "1934") vegas.roles.add("966455659413520384");

  const Vegas = new MessageEmbed().setColor(client.vegasRenkler[Math.floor(Math.random() * client.vegasRenkler.length)]).setAuthor(msg.author.tag, msg.member.user.avatarURL({dynamic: true})).setFooter(`Üyenin ceza puanı: ${totall}`).setDescription(`${vegas} adlı kullanıcı başarıyla erkek olarak kaydedildi.`)
  msg.channel.send(Vegas)
  
  await StaffDatabase.findOneAndUpdate({ guildID: msg.guild.id, userID: msg.author.id}, { $inc: { erkekkayıt: 1 } }, { upsert: true })       
  await ControlsDatabase.findOneAndUpdate({ guildID: msg.guild.id}, { $inc: { haftalıkkayıt: 1 } }, { upsert: true })
  await StaffDatabase.findOneAndUpdate({ guildID: msg.guild.id, userID: msg.author.id}, { $inc: { toplamkayıt: 1 } }, { upsert: true })
  await RegisterDatabase.findOneAndUpdate({ guildID: msg.guild.id, userID: vegas.id}, { $inc: { isimlererkek: 1 } }, { upsert: true })  
  const RegisterData = await RegisterDatabase.findOne({ guildID: msg.guild.id, userID: vegas.id});
  if(!RegisterData) {let newRegisterDatabase = new RegisterDatabase({guildID: msg.guild.id, userID: vegas.id, authorID: msg.author.id, isimler: [{isimler: `\`${vegas.displayName}\` (<@&${cfg.Roles.Erkek[0]}>)\n`}]}).save();} else{
  RegisterData.isimler.push({isimler: `\`${vegas.displayName}\` (<@&${cfg.Roles.Erkek[0]}>)\n`}); 
  RegisterData.save();}       
  if(YetkiliKayıtData)  {YetkiliKayıtData.delete()}
  if (cfg.Staff.StaffRoles.some(x => msg.member.roles.cache.has(x))) {
    const res = await görevDatabase.findOne({guildID: msg.guild.id, userID: msg.author.id});
    if(res) {
    await görevDatabase.findOneAndUpdate({guildID: msg.guild.id, userID: msg.author.id}, {$inc: {KayıtCount: 1}}, {upsert: true})  
    const res = await görevDatabase.findOne({guildID: msg.guild.id, userID: msg.author.id}); 
    let görev = res.Kayıt.map((q) => q.Count)
    let count = res && res.KayıtCount ? res.KayıtCount : 0
    if(count >= görev) {
    if(res.KayıtDurum === "Ödül Alındı!") {}else{
    if(res.KayıtDurum === "Tamamlandı!") {}else{
    await görevDatabase.findOneAndUpdate({guildID: msg.guild.id, userID: msg.author.id}, {$set: {KayıtDurum: "Tamamlandı!"}}, {upsert: true})    
    }}}}
    await Puan.findOneAndUpdate({ guildID: msg.guild.id, userID: msg.author.id }, { $inc: { puan: cfg.Puan.kayıtPuan, kayıt: 1, kayıtPuan: cfg.Puan.kayıtPuan } }, { upsert: true });
    await CoinDatabase.findOneAndUpdate({ guildID: msg.guild.id, userID: msg.author.id }, { $inc: { coinDaily: cfg.Puan.kayıtCoin, coinWeek: cfg.Puan.kayıtCoin, coinMonth: cfg.Puan.kayıtCoin, Coin: cfg.Puan.kayıtCoin, kayıt: 1, kayıtCoin: cfg.Puan.kayıtCoin } }, { upsert: true });
    const puanData = await Puan.findOne({ guildID: msg.guild.id, userID: msg.author.id });
    if (puanData && client.puanData.some(x => x.puan >= puanData.puan)) {
    let newRank = client.puanData.filter(x => puanData.puan >= x.puan);
    newRank = newRank[newRank.length-1];
    if (newRank && Array.isArray(newRank.role) && !newRank.role.some(x => msg.member.roles.cache.has(x)) || newRank && !Array.isArray(newRank.role) && !msg.member.roles.cache.has(newRank.role)) {
    const oldRank = client.puanData[client.puanData.indexOf(newRank)-1];
    msg.member.roles.add(newRank.role);
    if (oldRank && Array.isArray(oldRank.role) && oldRank.role.some(x => msg.member.roles.cache.has(x)) || oldRank && !Array.isArray(oldRank.role) && msg.member.roles.cache.has(oldRank.role)) msg.member.roles.remove(oldRank.role);
    const maxValue = client.puanData[client.puanData.indexOf(client.puanData.find(x => x.puan >= (puanData ? puanData.puan : 0)))] || client.puanData[client.puanData.length-1];
    const maxValue2 = client.puanData[client.puanData.indexOf(maxValue)-2]  
    if(msg.member.roles.cache.has(Array.isArray(newRank.role) ? newRank.role.map(x => `<@&${x}>`).join(", ") : `<@&${newRank.role}>`)) return
    try{msg.guild.channels.cache.get(cfg.Channels.yetkiUp).send(`🎉 ${msg.author} tebrikler! Puan sayın bir sonraki yetkiye geçmen için yeterli oldu. <@&${maxValue2.role}> yetkisinden ${Array.isArray(newRank.role) ? newRank.role.map(x => `<@&${x}>`).join(", ") : `<@&${newRank.role}>`} yetkisine terfi edildin!`);
    }catch{msg.guild.channels.cache.get(cfg.Channels.yetkiUp).send(`🎉 ${msg.author} tebrikler! Puan sayın bir sonraki yetkiye geçmen için yeterli oldu. ${Array.isArray(newRank.role) ? newRank.role.map(x => `<@&${x}>`).join(", ") : `<@&${newRank.role}>`} yetkisine terfi edildin!`); }}}}    
   
  client.channels.cache.get(cfg.Channels.Chat).send(`Aramıza yeni biri katıldı! ${vegas} ona hoş geldin diyelim!`)
  const StaffDatax = await StaffDatabase.findOne({ guildID: msg.guild.id});
  const StaffDataxx = await StaffDatabase.findOne({ guildID: msg.guild.id, userID: msg.author.id});
  if (StaffDatax && StaffDatax.kayıtlar.includes(vegas.id)) {}else{
  if(!StaffDataxx) {let newStaffDataa = new StaffDatabase({guildID: msg.guild.id, userID: msg.author.id, kayıtlar: vegas.id}).save();} else{StaffDataxx.kayıtlar.push(vegas.id);
  StaffDataxx.save();}} } catch(err) { client.timemessage(client.normalEmbed(`Lütfen bir üyeyi etiketle ve tekrar dene!`, msg), msg.channel.id, 5000)}}}
