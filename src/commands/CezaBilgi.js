module.exports = {
  conf: {
    aliases: ["cezainfo", "ceza-bilgi", "ceza-info", "bilgi-ceza"],
    name: "cezabilgi",
    usage: 'cezabilgi [uye]',
    description: 'Belirttiğiniz üyenin aktif cezalarını görüntülersiniz.',
  },

 run: async ({client, msg, args, uye, cfg, author, GeneralDatabase, MessageEmbed, CezaDatabase, moment}) => {
  
        if (!msg.member.roles.cache.some(r => cfg.Hammer.Other.includes(r.id)) && !msg.member.roles.cache.some(r => cfg.Hammer.BotCommands.includes(r.id)) && !msg.member.hasPermission(8)) return client.timemessage(client.yetersizYetki(msg, msg), msg.channel.id, 5000)
        if (!uye) return client.timemessage(client.normalEmbed(`Lütfen bir üyeyi etiketle ve tekrar dene!`,msg), msg.channel.id, 7000)
        if(!msg.guild.members.cache.has(uye.id)) return client.timemessage(client.normalEmbed("Ceza bilgisine bakmak istediğin kullanıcı sunucuda bulunmuyor.",msg), msg.channel.id, 7000)
        let mute = ""
        let vmute = ""
        let cezalı = ""
        await CezaDatabase.findOne({ guildID: msg.guild.id, userID: uye.id, jail: true }, async (err, doc) => {
        if (!doc) {
         cezalı = "Veritabanında aktif cezalı bilgisi bulunmamakta."
        } else {
        if (doc.jail == true) {
         cezalı = "Cezalı Atan Yetkili: <@" + doc.authorID + ">\nCeza Sebebi: `" + doc.Reason + "`\nCeza Tarihi: `" + moment(doc.date).locale("TR").format("LLL") + "`\nCeza Bitiş: `" + moment(doc.finishDate).locale("TR").format("LLL") + "` "
        } else {
         cezalı = "Veritabanında aktif cezalı bilgisi bulunmamakta."}}})
        await CezaDatabase.findOne({ guildID: msg.guild.id, userID: uye.id, chatmuted: true }, async (err, doc) => {
        if (!doc) {
         mute = "Veritabanında aktif chat mute bilgisi bulunmamakta."
        } else {
        if (doc.chatmuted == true) {
         mute = "Mute Atan Yetkili: <@" + doc.authorID + ">\nMute Sebebi: `" + doc.Reason + "`\nMute Başlangıç: `" + moment(doc.date).locale("TR").format("LLL") + "`\nMute Bitiş: `" + moment(doc.finishDate).locale("TR").format("LLL") + "` "
        } else {
         mute = "Veritabanında aktif chat mute bilgisi bulunmamakta."}}})
        await CezaDatabase.findOne({ guildID: msg.guild.id, userID: uye.id, voicemuted: true }, async (err, doc) => {
        if (!doc) {
         vmute = "Veritabanında aktif ses mute bilgisi bulunmamakta."
        } else {
        if (doc.voicemuted == true) {
         vmute = "Mute Atan Yetkili: <@" + doc.authorID + ">\nMute Sebebi: `" + doc.Reason + "`\nMute Başlangıç: `" + moment(doc.date).locale("TR").format("LLL") + "`\nMute Bitiş: `" + moment(doc.finishDate).locale("TR").format("LLL") + "` "
        } else {
         vmute = "Veritabanında aktif ses mute bilgisi bulunmamakta."}}})
        let uu = client.users.cache.get(uye.id)
        const embed = new MessageEmbed()
         .setAuthor(msg.author.tag, msg.author.displayAvatarURL({ dynamic: true }))
         .setColor("RANDOM")
         .setDescription("<@" + uye.id + "> kişisinin ceza bilgileri aşağıda belirtilmiştir.")
         .setThumbnail(uu.displayAvatarURL({ dynamic: true }))
         .addFields(
          { name: 'Cezalı Bilgisi', value: cezalı || "Veritabanında cezalı bilgisi bulunmamakta." },
          { name: 'Chat Mute Bilgisi:', value: mute || "Veritabanında chat mute bilgisi bulunmamakta.", inline: false },
          { name: 'Ses Mute Bilgisi:', value: vmute || "Veritabanında ses mute bilgisi bulunmamakta.", inline: false },)
        await msg.channel.send(embed)}}