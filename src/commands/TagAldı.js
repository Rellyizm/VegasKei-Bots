module.exports = {
  conf: {
    aliases: ["tagaldı","taglı"],
    name: "tag-aldı",
    usage: 'tagaldı [üye]',
    description: 'Belirttiğiniz kullanıcıya tag aldırdığınızı belirtirsiniz.',
},

 run: async ({client, msg, args, cfg, author, MessageEmbed, uye, moment, CoinDatabase, Puan, GeneralDatabase, TagAldıDatabase, StaffDatabase, ControlsDatabase, görevDatabase}) => {
   

  if (!msg.member.roles.cache.some(r => cfg.Hammer.Other.includes(r.id)) && !msg.member.roles.cache.some(r => cfg.Hammer.BotCommands.includes(r.id)) &&!msg.member.hasPermission(8)) return client.timemessage(client.yetersizYetki(msg, msg), msg.channel.id, 5000)                              
  if (!uye) return client.timemessage(client.normalEmbed(`Lütfen bir üyeyi etiketle ve tekrar dene!`, msg), msg.channel.id, 5000)
  if (uye.user.bot) return client.timemessage(client.normalEmbed(`Botlara herhangi bir işlem uygulayamazsın.`, msg), msg.channel.id, 5000)
  if (uye.id == (`${msg.author.id}`)) return client.timemessage(client.normalEmbed(`Kendine herhangi bir işlem uygulayamazsın.`, msg), msg.channel.id, 5000)
  if (!cfg.Tag.Tags.some(x => uye.user.tag.includes(x))) return client.timemessage(client.normalEmbed(`Belirttiğiniz kullanıcı sunucu tagına sahip olmadığı için yetki verme işlemi uyguluyamazsın.`, msg), msg.channel.id, 5000)
  const TagAldıStatus = await GeneralDatabase.findOne({ guildID: msg.guild.id, userID: uye.id})
  if (TagAldıStatus && TagAldıStatus.tagaldı === true) return msg.reply(`Belirtilen üyeye daha önceden bir başkası tarafından tag aldırılmış!`)
  const filter = (reaction, user) => {return ["✅", "❌"].includes(reaction.emoji.name) && user.id === uye.id;};
  let VegasEmbed1 = new MessageEmbed().setAuthor(`${msg.guild.name} Tag Aldırma Sistemi`, msg.guild.iconURL({dynamic: true})).setDescription(`Merhaba ${uye}, **${msg.guild.name}** adlı sunucudan bir üye, size sunucu tagını aldırdığını iddia ediyor.\n\n**Üye:** ${msg.author} | ${msg.author.tag} | ${msg.author.id}\n\nEğer yukarıda belirtilen üye, **size sunucu tagını aldırdıysa** lütfen işlemi mesajdaki **tike basarak onaylayın!** (Aldırmadıysa çarpıya basın!)`).setFooter('Eğer tepkiye tıklanmazsa 1 dakika sonra işlem iptal edilecek.')
  msg.channel.send(`${uye}`).then(message =>msg.channel.send(VegasEmbed1).then(m => m.react("✅").then(a => m.react("❌")).then(s =>m.awaitReactions(filter, { max: 1, time: 60000, errors: ["time"] }).then(async collected => {
  const reaction = collected.first();
  if (reaction.emoji.name === "✅") {
    if (cfg.Staff.StaffRoles.some(x => msg.member.roles.cache.has(x))) {
      const res = await görevDatabase.findOne({guildID: msg.guild.id, userID: msg.author.id});
      if(res) {
      await görevDatabase.findOneAndUpdate({guildID: msg.guild.id, userID: msg.author.id}, {$inc: {TagCount: 1}}, {upsert: true})  
      const res = await görevDatabase.findOne({guildID: msg.guild.id, userID: msg.author.id}); 
      let görev = res.Tag.map((q) => q.Count)
      let count = res && res.TagCount ? res.TagCount : 0
      if(count >= görev) {
      if(res.TagDurum === "Ödül Alındı!") {}else{
      if(res.TagDurum === "Tamamlandı!") {}else{
      await görevDatabase.findOneAndUpdate({guildID: msg.guild.id, userID: msg.author.id}, {$set: {TagDurum: "Tamamlandı!"}}, {upsert: true})    
      }}}}
      await Puan.findOneAndUpdate({ guildID: msg.guild.id, userID: msg.author.id }, { $inc: { puan: cfg.Puan.tagPuan, tag: 1, tagPuan: cfg.Puan.tagPuan } }, { upsert: true });
      await CoinDatabase.findOneAndUpdate({ guildID: msg.guild.id, userID: msg.author.id }, { $inc: { coinMonth: cfg.Puan.tagCoin, coinWeek: cfg.Puan.tagCoin, coinDaily: cfg.Puan.tagCoin, Coin: cfg.Puan.tagCoin, tag: 1, tagCoin: cfg.Puan.tagCoin } }, { upsert: true });
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
     
  await StaffDatabase.findOneAndUpdate({ guildID: msg.guild.id, userID: msg.author.id}, { $inc: { tagaldıtotal: 1 } }, { upsert: true });
  const TagAldıData = await StaffDatabase.findOne({ guildID: msg.guild.id, userID: msg.author.id});
  if(!TagAldıData) {let newTagAldı = new StaffDatabase({guildID: msg.guild.id, userID: msg.author.id , tagaldı: [{id: uye.id, date: Date.now()}]}).save();} else{
  TagAldıData.tagaldı.push({id: uye.id, date: Date.now()}); 
  TagAldıData.save();}
  await GeneralDatabase.findOneAndUpdate({ guildID: msg.guild.id, userID: uye.id}, { $set: { tagaldı: true } }, { upsert: true });
  await ControlsDatabase.findOneAndUpdate({ guildID: msg.guild.id}, { $inc: { haftalıktaglı: 1 } }, { upsert: true });
  m.edit(new MessageEmbed().setDescription(`Belirttiğiniz üye tag aldırdığınızı onayladı ve üye başarıyla veritabanına kaydedildi!`).setColor(client.vegasRenkler[Math.floor(Math.random() * client.vegasRenkler.length)])) && m.reactions.removeAll() && message.delete()
}
  if (reaction.emoji.name === "❌") {message.delete(); m.delete();}}).catch((err) => m.edit(new MessageEmbed().setColor(client.vegasRenkler[Math.floor(Math.random() * client.vegasRenkler.length)]).setAuthor(message.author.tag, message.member.user.avatarURL({dynamic:true})).setDescription(`Seçim için belirtilen sürede tepkiye tıklanmadığı için işlem iptal edildi.`)) && m.reactions.removeAll() && msg.delete()))))}}
