module.exports = {
  conf: {
    aliases: ["notlist","not-list","notliste"],
    name: "notlar",
    usage: 'notlar [üye]',
    description: 'Belirttiğiniz üyenin notlarını görüntülersiniz.',
  },

 run: async ({client, msg, args, cfg, author, uye, NotDatabase}) => {
   
     if (!msg.member.roles.cache.some(r => cfg.Hammer.Other.includes(r.id)) && !msg.member.roles.cache.some(r => cfg.Hammer.BotCommands.includes(r.id)) && !msg.member.hasPermission(8)) return client.message(client.yetersizYetki(msg, msg), msg.channel.id, 5000)
     if (!uye) return client.timemessage(client.normalEmbed("Notlarına bakmak istediğin kullanıcıyı düzgünce belirt ve tekrar dene !", msg,), msg.channel.id, 7000)
     await NotDatabase.findOne({ user: uye.id }, async (err, res) => {
     if (!res) return client.timemessage(client.normalEmbed("Notlarına bakmak istediğin kullanıcıya ait sistemde not bulunmuyor.", msg,), msg.channel.id, 7000)
     client.message(client.normalEmbed(`- <@${uye.id}> kişisinin ceza notları aşağıda belirtilmiştir.\n\n${res.notlar.map(x => `-Not Bırakan Yetkili: <@${x.yetkili}>(\`${x.yetkili}\`)\n-Not: \`${x.not}\``).slice(0, 10).join("\n\n")}`, msg), msg.channel.id)})}}