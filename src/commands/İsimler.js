module.exports = {
  conf: {
    aliases: [],
    name: "isimler",
    usage: 'isimler [üye]',
    description: 'Belirttiğiniz kullanıcının sunucuya daha önce kayıt olduğu isimleri görürsünüz.',
  },

 run: async ({client, msg, args, cfg, author, guild, MessageEmbed, uye, fs, MessageAttachment, RegisterDatabase}) => {
   
  if (!msg.member.roles.cache.some(r => cfg.Hammer.Other.includes(r.id)) && !msg.member.roles.cache.some(r => cfg.Hammer.BotCommands.includes(r.id)) && !msg.member.hasPermission(8)) return client.timemessage(client.yetersizYetki(msg, msg), msg.channel.id, 5000)
  if (!uye) return client.timemessage(client.normalEmbed(`Lütfen bir üyeyi etiketle ve tekrar dene!`,msg), msg.channel.id, 5000)
  let RegisterData = await RegisterDatabase.findOne({ guildID: msg.guild.id, userID: uye.id})
  let isimlerkız = RegisterData && RegisterData.isimlerkız ? RegisterData.isimlerkız : 0
  let isimlererkek = RegisterData && RegisterData.isimlererkek ? RegisterData.isimlererkek : 0
  let isimlerayrılma = RegisterData && RegisterData.isimlerayrılma ? RegisterData.isimlerayrılma : 0
  let totalisimler = isimlererkek + isimlerkız + isimlerayrılma
  let isims; if(!(RegisterData && RegisterData.isimler)) isims = `${cfg.Emoji.RedEmoji} Kullanıcının veritabanında eski isim kayıtı bulunamadı.`
  else isims = RegisterData.isimler.map(x => `${x.isimler}`).join("")
  let Vegas = new MessageEmbed().setColor(client.vegasRenkler[Math.floor(Math.random() * client.vegasRenkler.length)]).setAuthor(uye.user.tag, uye.user.avatarURL({dynamic: true})).setDescription(`${totalisimler ? `Bu üyenin toplamda ${totalisimler} isim kayıtı bulundu:`: ""}\n\n${isims}`)
  msg.channel.send(Vegas)}}