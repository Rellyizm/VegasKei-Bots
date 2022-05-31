module.exports = {
  conf: {
    aliases: [],
    name: "afk",
    usage: 'afk [sebep]',
    description: 'AFK moduna girersiniz.',
  },

 run: async ({client, msg, args, cfg, author, GeneralDatabase}) => {
   
 if (!msg.member.roles.cache.some(r => cfg.Hammer.Other.includes(r.id)) && !msg.member.roles.cache.has(cfg.Tag.TagRolü) && !msg.member.hasPermission(8)) return client.timemessage(client.normalEmbed(`Bu özellik sadece taglı üyelerimiz içindir. Tag alıp kullanabilirsin.`, msg), msg.channel.id, 5000) 
 if (client.afklar.has(author.id)) return null
 var reason = args.join(" ")
 if (reason && (await client.chatKoruma(reason)) || reason.toLowerCase().includes("@here") || reason.toLowerCase().includes("@everyone")) return client.timemessage(client.normalEmbed(`Geçerli bir sebep belirtmelisin.`, msg), msg.channel.id, 5000) 
 if(!reason) reason = "Sebep Belirtilmedi."
 GeneralDatabase.findOne({guildID: msg.guild.id, userID: author.id}, async (err, res) => {
 if (!res) {
 new GeneralDatabase({guildID: msg.guild.id, userID: author.id, afk: { mod: true, reason: reason, date: Date.now() } }).save();
 if (author.displayName.length < 28) author.setNickname(`[AFK] ${author.displayName}`).catch(() => { })
 client.timemessage(client.normalEmbed(`${author} seni AFK olarak ayarladım ve mesajını şu şekilde ayarladım: ${reason}`, msg), msg.channel.id, 5000)
 client.react(msg, "tick")
 } else {
 res.afk = { mod: true, reason: reason, date: Date.now() };
 res.save();
 if (author.displayName.length < 28) author.setNickname(`[AFK] ${author.displayName}`).catch(() => { })
 client.timemessage(client.normalEmbed(`${author} seni AFK olarak ayarladım ve mesajını şu şekilde ayarladım: ${reason}`, msg), msg.channel.id, 5000)
 client.react(msg, "tick")}})
 if (client.afklar.has(author.id)) setTimeout(() => client.afklar.delete(author.id), client.getDate(7, "saniye"));}}
