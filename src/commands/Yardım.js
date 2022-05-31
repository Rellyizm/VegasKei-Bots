module.exports = {
  conf: {
    aliases: ["modhelp","mody","modh"],
    name: "modyardım",
    usage: "modyardım [komut adı]",
    description: "Botta bulunan tüm komutları listeler."
  },

 run: async ({client, msg, args, cfg, author, MessageEmbed, prefix}) => {

  if (!msg.member.roles.cache.some(r => cfg.Hammer.Other.includes(r.id)) && !msg.member.roles.cache.has(cfg.Tag.TagRolü) && !msg.member.hasPermission(8)) return client.timemessage(client.yetersizYetki(msg, msg), msg.channel.id, 5000)                              
  let embed = new MessageEmbed().setAuthor(msg.author.tag, msg.author.avatarURL({dynamic: true})).setColor(client.vegasRenkler[Math.floor(Math.random() * client.vegasRenkler.length)])
  let embed2 = new MessageEmbed().setColor(client.vegasRenkler[Math.floor(Math.random() * client.vegasRenkler.length)])  
  let command = args[0] 
	if (global.commands.has(command)) {
	command = global.commands.get(command)
	embed
	.addField('Komut Adı', command.conf.name, false)
	.addField('Komut Açıklaması', command.conf.description, false)
	.addField('Doğru Kullanım', command.conf.usage)
	.addField('Alternatifler', command.conf.aliases[0] ? command.conf.aliases.join(', ') : 'Bulunmuyor')
	.setColor('0x36393E')
	msg.channel.send(embed)
  return;}
  let yazı = "";
  global.commands.forEach(command => {
  yazı += `\`${prefix}${command.conf.usage}\` \n`;});
  msg.channel.send(embed.setDescription(yazı).setFooter(`Detaylı bilgi: "${prefix}yardım {komut adı}"`));
  msg.channel.send(embed2.setDescription(`\`NOT: Jail,Mute,Sesmute komutların da eğer cezapuanınız 40 ile 20 arasında ise 3 dakika, 70 ile 40 arasında ise 5 dakika, 100 ile 70 arasında ise 25 dakika, 200 ile 100 arasında ise 30 dakika, 200 üstüyse + 1 saat süreye eklenir.\n\nNOT: Streamer +18 odalarına 18 yaş altı bir kullanıcı giriş yaparsa bot bağlantısını keser ve 3 uyarıdan sonra streamer cezalı rolünü verir.\n\nNOT: Eğer kullanıcı jail,mute,sesmute yedikten sonra sunucuya çık gir yaparsa bot otomatik cezayı devam ettirir.\n\nNOT: Kayıt kodlarında 40 cezapuanı üstü olan kullanıcıları ve hesabı 7 günden önce açılan hesaplara işlem yapamazsınız ardından fake kayıt verinize +1 eklenir.\n\n CezaPuanı:\n\n250 ceza puanı olursanız, alacağınız her 3 ceza sizi 3 gün boyunca @Cezalı'ya götürecektir. 3 gün boyunca sunucuya erişemeyeceksiniz.\n\nChat ve Voice Mute: 8 puan\nBan: 10 puan\nCezalı: 15 puan\n\nNOT: Ban komutlarında yarım saatte 5 ban atabilirsiniz.\`\n\`Ayrıca: Botta üstteki özellikler gibi birçok özellik vardır, botta bir sıkıntı görürseniz (işlemi tam yapmama gibi) veya bot hakkında önerileriniz var ise ${client.users.cache.get(`885590145896689664`).tag} ("885590145896689664") adlı kullanıcıya dm yoluyla ulaşınız!\``)) }}
