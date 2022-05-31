module.exports = {
  conf: {
    aliases: ["baninfo"],
    name: "banbilgi",
    usage: 'banbilgi [üye]',
    description: 'Belirttiğiniz kullanıcının ban sebebini ve kim tarafından atıldığını görürsünüz.',
  },

 run: async ({client, msg, args, cfg, author, uye, Discord, MessageEmbed, moment, CezaDatabase}) => {
   
      if (!msg.member.roles.cache.some(r => cfg.Hammer.Other.includes(r.id)) && !msg.member.roles.cache.some(r => cfg.Hammer.Ban.includes(r.id)) && !msg.member.hasPermission(8)) return client.timemessage(client.yetersizYetki(msg, msg), msg.channel.id, 5000)
      await client.users.fetch(args[0]).then(res => {
      if(!res){client.timemessage(client.normalEmbed(`Geçerli bir kullanıcı ID si giriniz.`, msg), msg.channel.id, 7000)}else{msg.guild.fetchBans(true).then(async(bans) => {let ban = await bans.find(a => a.user.id === res.id)
      const CezaData = await CezaDatabase.findOne({ guildID: msg.guild.id, userID: res.id, ban: true})
      if(!ban){client.message(client.normalEmbed(`\`${res.tag}\` bu sunucuda yasaklı değil!`, msg), msg.channel.id)}else{
      let text = `:no_entry_sign:  ${res.tag} (\`${res.id}\`) adlı kullanıcı sunucumuzdan şu sebepten dolayı yasaklanmış:\n\n"${CezaData ? CezaData.Reason : ban.reason || "Sebep Belirtilmemiş."}"`
      msg.guild.fetchAuditLogs({type: 'MEMBER_BAN_ADD'}).then(audit => {let user = audit.entries.find(a => a.target.id === res.id)
      client.message(client.normalEmbed(text + `\n─────────────────────────────\nKullanıcı, ${CezaData ? `<@!${CezaData.authorID}> (\`${CezaData.authorID}\`) tarafından ${moment(CezaData.date).locale("TR").format("LLL")}` : `${user.executor.tag} (\`${user.executor.id}\`) tarafından ${moment(user.createdAt).locale("TR").format("LLL")}`} tarihinde yasaklanmış.`, msg), msg.channel.id)})}})}}).catch(err => {client.timemessage(client.normalEmbed(`Geçerli bir kullanıcı ID si giriniz.`, msg), msg.channel.id, 7000)})}}