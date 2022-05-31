module.exports = {
  conf: {
    aliases: ["rolog","logrol","rolelog"],
    name: "rollog",
    usage: 'rollog [üye]',
    description: 'Belirttiğiniz kullanıcıya şuana kadar verilen veya alınan rolleri görürsünüz.',
},

 run: async ({client, msg, args, cfg, author, MessageEmbed, uye, GeneralDatabase}) => {
   
  if (!msg.member.roles.cache.some(r => cfg.Hammer.Other.includes(r.id)) && !msg.member.roles.cache.some(r => cfg.Hammer.BotCommands.includes(r.id)) &&!msg.member.hasPermission(8)) return client.timemessage(client.yetersizYetki(msg, msg), msg.channel.id, 5000)                              
  if (!uye) return client.timemessage(client.normalEmbed(`Lütfen bir üyeyi etiketle ve tekrar dene!`, msg), msg.channel.id, 5000)
  let GeneralData = await GeneralDatabase.findOne({ guildID: msg.guild.id, userID: uye.id})
  let rollog;
  if(!(GeneralData && GeneralData.rollog)) rollog = "Veritabanında bu kullanıcının rol bilgisi bulunamadı."
  else rollog = GeneralData.rollog.map(x => `${x.role}`).reverse().slice(0,10).join("\n─────────────────\n")
  client.message(client.normalEmbed(`${GeneralData && GeneralData.rollogtotal ? `${uye} kişisinin toplamda ${GeneralData.rollogtotal} rol bilgisi bulunmakta son 10 rolün bilgileri aşağıda belirtilmiştir.`: ""}\n\n${rollog}`, msg), msg.channel.id)}}