module.exports = {
  conf: {
    aliases: ["cezaıd"],
    name: "ceza",
    usage: 'ceza [ID]',
    description: 'Belirttiğiniz ceza numarası hakkında bilgi alırsınız.',
  },

 run: async ({client, msg, args, cfg, author, guild, MessageEmbed, CezaDatabase, moment}) => {
   
  if (!msg.member.roles.cache.some(r => cfg.Hammer.Other.includes(r.id)) && !msg.member.roles.cache.some(r => cfg.Hammer.BotCommands.includes(r.id)) && !msg.member.hasPermission(8)) return client.timemessage(client.yetersizYetki(msg, msg), msg.channel.id, 5000)
  let sayı = Number(args[0])
  if(!sayı) return client.timemessage(client.normalEmbed(`Kontrol etmek istediğin ceza numarasını girmelisin.`, msg), msg.channel.id, 5000)
  let CezaData = await CezaDatabase.findOne({ guildID: msg.guild.id, cezaID: sayı})
   let tarih = CezaData.date 
  let finish = CezaData.finishDate 
  if(!CezaData) return client.message(client.normalEmbed(`Belirttiğin numaralı ceza bilgisi bulunamadı.`, msg), msg.channel.id)
  let uye = msg.guild.members.cache.get(CezaData.userID)
  let Vegas = new MessageEmbed().setAuthor(msg.author.tag, msg.member.user.avatarURL({dynamic: true})).setColor(client.vegasRenkler[Math.floor(Math.random() * client.vegasRenkler.length)]).setThumbnail(msg.guild.members.cache.get(CezaData.userID) ? uye.user.avatarURL({dynamic: true}) : msg.author.avatarURL({dynamic: true})).setDescription(`<@${CezaData.userID}> kişisine uygulanan ${args[0]} numaralı ceza bilgisi;`)
   .addFields(
    { name: 'Ceza Türü', value: CezaData.Type },
    { name: 'Ceza Atan Yetkili:', value: `<@${CezaData.authorID}>`, inline: false },
    { name: 'Ceza Sebebi:', value: CezaData.Reason, inline: false },
    { name: 'Ceza Başlangıç:', value: `${moment(CezaData.date).locale("TR").format("LLL")} (${moment(tarih).locale("TR").fromNow()})`, inline: false },
    { name: 'Ceza Bitiş:', value: `${CezaData.finishDate === 0 ? "-" : `${moment(CezaData.finishDate).locale("TR").format("LLL")} (${moment(finish).locale("TR").fromNow()})`}`, inline: false },)
 msg.channel.send(Vegas)}}
