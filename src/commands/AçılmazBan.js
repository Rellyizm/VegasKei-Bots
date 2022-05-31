module.exports = {
  conf: {
    aliases: ["acılmazban", "acılmaz-ban", "açılmaz-ban", "açılamazban", "acılamazban", "açılamaz-ban", "acılamaz-ban"],
    name: "açılmazban",
    usage: 'açılmazban [ID] [sebep]',
    description: 'Belirttiğiniz ID li kullanıcı açılamaz olarak etiketler.',
  },
 run: async ({client, msg, args, cfg, author, Discord, moment, ms, AçılmazBanDatabase, CezaDatabase}) => {
 
        if (!msg.member.roles.cache.some(r => cfg.Hammer.Other.includes(r.id)) && !msg.member.hasPermission(8)) return
        if (!args[0]) return client.timemessage(client.normalEmbed(`Geçerli bir kullanıcı ID si giriniz.`, msg), msg.channel.id, 7000)
        await client.users.fetch(args[0]).then(res => {
        if (!res) {client.timemessage(client.normalEmbed(`Geçerli bir kullanıcı ID si giriniz.`, msg), msg.channel.id, 7000)} else {
        msg.guild.fetchBans(true).then(async (bans) => {
        let ban = await bans.find(a => a.user.id === res.id)
        if (!ban) {client.message(client.normalEmbed(`\`${res.tag}\` bu sunucuda yasaklı değil!`, msg), msg.channel.id)} else {
        await AçılmazBanDatabase.findOne({ user: res.id }, async (err, doc) => {
        if (doc) {client.message(client.normalEmbed(`**${res.tag}** kullanıcısı zaten <@${doc.mod}> tarafından açılamaz ban olarak etiketlenmiş.`, msg), msg.channel.id, 7000)} else {
        msg.guild.fetchAuditLogs({type: 'MEMBER_BAN_ADD', limit: 100}).then(audit => {
        let user = audit.entries.find(a => a.target.id === res.id)
        if(!user) return client.message(client.normalEmbed(`Açılamaz olarak etiketlemeye çalıştığınız kullanıcı son 100 yasaklama içerisinde bulunmuyor.`, msg), msg.channel.id)})
        client.message(client.normalEmbed(`**${res.tag}** kullanıcısı başarıyla açılamaz ban olarak etiketlendi. Bu yasaklamayı sadece **siz** kaldırabileceksiniz.`, msg), msg.channel.id)
        const newBanData = new AçılmazBanDatabase({
         user: res.id,
         mod: msg.author.id,
         sebep: ban.reason || "Sebep Belirtilmemiş"})
        newBanData.save().catch(e => console.log(e))}})}})}}).catch(err => {client.message(client.normalEmbed(`Geçerli bir kullanıcı ID si giriniz.`, msg), msg.channel.id)})}}