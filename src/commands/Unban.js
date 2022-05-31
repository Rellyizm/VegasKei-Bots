module.exports = {
  conf: {
    aliases: ["bankaldır"],
    name: "unban",
    usage: 'unban [ID]',
    description: 'Belirttiğiniz kullanıcının banını kaldırırsınız.',
 },

 run: async ({client, msg, args, cfg, author, guild, moment, CezaDatabase, MessageEmbed, ControlsDatabase, BanInfoDatabase, AçılmazBanDatabase}) => {
   
      if (!msg.member.roles.cache.some(r => cfg.Hammer.Other.includes(r.id)) && !msg.member.roles.cache.some(r => cfg.Hammer.Ban.includes(r.id)) && !msg.member.hasPermission(8)) return client.timemessage(client.yetersizYetki(msg, msg), msg.channel.id, 5000)
      if(!args[0]) return client.timemessage(client.normalEmbed(`Geçerli bir kullanıcı ID si giriniz.`, msg), msg.channel.id, 7000)
      await client.users.fetch(args[0]).then(res => {
      if(!res){client.timemessage(client.normalEmbed(`Geçerli bir kullanıcı ID si giriniz.`, msg), msg.channel.id, 7000)}else{msg.guild.fetchBans(true).then(async(bans) => {
      const CezaData = await CezaDatabase.findOne({ guildID: msg.guild.id, userID: res.id, ban: true})
      let ban = await bans.find(a => a.user.id === res.id)
      msg.guild.fetchAuditLogs({type: 'MEMBER_BAN_ADD'}).then(async audit => {let user = audit.entries.find(a => a.target.id === res.id)
      if(!ban){client.message(client.normalEmbed(`\`${res.tag}\` bu sunucuda yasaklı değil!`, msg), msg.channel.id)} else {
      await AçılmazBanDatabase.findOne({user: res.id}, async(err,dbres) => {if(!dbres) {
      client.channels.cache.get(cfg.Channels.Ban).send(new MessageEmbed().setColor("27d38a").setFooter(CezaData ? `Ceza Numarası: #${CezaData.cezaID}` : moment(cfg.Bot.Heroku === true ? Date.now() : Date.now()).locale("TR").format("LLL")).setAuthor(msg.author.tag, msg.author.avatarURL({ dynamic: true })).setDescription(`**${res.tag}** (\`${res.id}\`) üyesinin yasağı kaldırıldı.`).addField(`**Ban Bilgisi**`, `${CezaData ? `• Yetkili <@!${CezaData.authorID}> (\`${CezaData.authorID}\`)\n• Yasaklanma Tarihi \`${moment(CezaData.date).locale("TR").format("LLL")}\`\n• Yasaklanma Sebebi \`${CezaData.Reason}\`` : `• Yetkili <@!${user.executor.id}> (\`${user.executor.id}\`)\n• Yasaklanma Tarihi \`${moment(user.createdAt).locale("TR").format("LLL")}\`\n• Yasaklanma Sebebi \`${ban.reason ? ban.reason : "Sebep belirtilmemiş."}\``}`))   
      msg.guild.members.unban(res.id)
      CezaData.ban = false
      CezaData.save() 
      client.message(client.normalEmbed(`**${res.tag}** kullanıcısının yasağı kaldırıldı.`, msg), msg.channel.id)} else {
      if(!(msg.author.id === dbres.mod)) return client.message(client.normalEmbed(`${res.tag} kullanıcısının yasağı <@${dbres.mod}> tarafından açılamaz olarak etiketlenmiştir.Yasağı sadece <@${dbres.mod}> kaldırabilir.`, msg), msg.channel.id)
      client.channels.cache.get(cfg.Channels.Ban).send(new MessageEmbed().setColor("27d38a").setFooter(CezaData ? `Ceza Numarası: #${CezaData.cezaID}` : moment(cfg.Bot.Heroku === true ? Date.now() : Date.now()).locale("TR").format("LLL")).setAuthor(msg.author.tag, msg.author.avatarURL({ dynamic: true })).setDescription(`**${res.tag}** (\`${res.id}\`) üyesinin yasağı kaldırıldı.`).addField(`**Ban Bilgisi**`, `${CezaData ? `• Yetkili <@!${CezaData.authorID}> (\`${CezaData.authorID}\`)\n• Yasaklanma Tarihi \`${moment(CezaData.date).locale("TR").format("LLL")}\`\n• Yasaklanma Sebebi \`${CezaData.Reason}\`` : `• Yetkili <@!${user.executor.id}> (\`${user.executor.id}\`)\n• Yasaklanma Tarihi \`${moment(user.createdAt).locale("TR").format("LLL")}\`\n• Yasaklanma Sebebi \`${ban.reason ? ban.reason : "Sebep belirtilmemiş."}\``}`))   
      msg.guild.members.unban(res.id)
      CezaData.ban = false
      CezaData.save()  
      client.message(client.normalEmbed(`**${res.tag}** kullanıcısının yasağı kaldırıldı.`, msg), msg.channel.id)
      dbres.delete().catch(e => console.log(e))}})}})})}}).catch(err => {client.timemessage(client.normalEmbed(`Geçerli bir kullanıcı ID si giriniz.`, msg), msg.channel.id, 7000)})}}