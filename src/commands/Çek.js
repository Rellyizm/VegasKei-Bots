module.exports = {
  conf: {
    aliases: [],
    name: "çek",
    usage: 'çek [üye]',
    description: 'Sesli kanallarda belirttiğiniz kullanıcıyı bulunduğunuz kanala izinli bir şekilde çekersiniz.',
  },

 run: async ({client, msg, args, cfg, author, guild, MessageEmbed, uye}) => {
   
  if (!msg.member.voice.channel) return client.timemessage(client.normalEmbed(`İlk önce ses kanallarından birine girmelisin. Girdikten sonra tekrar denersen olacaktır.`, msg), msg.channel.id, 5000) 
  if (!uye) return client.timemessage(client.normalEmbed(`Lütfen bir üyeyi etiketle ve tekrar dene!`, msg), msg.channel.id, 5000)
  if (uye.user.bot) return client.timemessage(client.normalEmbed(`Botlara herhangi bir işlem uygulayamazsın.`, msg), msg.channel.id, 5000)
  if (uye.id == (`${msg.author.id}`)) return client.timemessage(client.normalEmbed(`Kendine herhangi bir işlem uygulayamazsın.`, msg), msg.channel.id, 5000)
  if (!uye.voice.channel) return client.timemessage(client.normalEmbed(`Belirttiğin kişi herhangi bir ses kanalında değil.`, msg), msg.channel.id, 5000)
  if (uye.voice.channel.id === msg.member.voice.channel.id) return client.timemessage(client.normalEmbed(`Zaten belirttiğin kişi ile aynı ses kanalındasın.`, msg), msg.channel.id, 5000)
  if (msg.member.roles.cache.some(r => cfg.Hammer.Other.includes(r.id)) && msg.member.hasPermission(268435456) && msg.member.hasPermission(8)) {client.çek(uye, msg.member); client.timemessage(client.normalEmbed(`Başarıyla ${uye} adlı üye kanalınıza taşındı.`, msg), msg.channel.id, 5000); client.react(msg, "tick"); return}
  const filter = (reaction, user) => {return ["822186083521265695", "822186093360971857"].includes(reaction.emoji.id) && user.id === uye.id;};
  client.timemessage(`${uye}`, msg, msg.channel.id, 3000)
  msg.channel.send(new MessageEmbed().setFooter('Eğer istek onaylanmazsa 20 saniye sonra iptal edilecek.').setDescription(`${uye}, ${msg.author} Bulunduğu Sesli Kanala Sizi Çekmek İstiyor. Kabul Ediyor Musunuz?`).setAuthor(msg.author.tag, msg.member.user.avatarURL({dynamic: true})).setColor(client.vegasRenkler[Math.floor(Math.random() * client.vegasRenkler.length)])).then(m => client.react(m, "tick").then(a => client.react(m, "red")).then(s =>m.awaitReactions(filter, { max: 1, time: 20000, errors: ["time"] }).then(collected => {
  const reaction = collected.first()
  if (reaction.emoji.id === "822186083521265695") {client.react(msg, "tick")
  client.timemessage(client.normalEmbed(`${msg.author}, Belirttiğin kişiyi bulunduğun ses kanalına taşıdın.`, msg), msg.channel.id, 5000)
  client.çek(uye, msg.member); m.delete()}
  if (reaction.emoji.id === "822186093360971857") {client.react(msg, "red"); client.timemessage(client.normalEmbed(`${msg.author}, Belirttiğin kişi bulunduğun ses kanalına gelmek istemiyor bu sebepten ötürü bulunduğun ses kanalına taşıyamadım. `, msg), msg.channel.id, 5000)
  m.delete();}})).catch(() => m.edit(client.normalEmbed(`Seçim için belirtilen sürede tepkiye tıklanmadığı için işlem iptal edildi.`, msg)) && m.reactions.removeAll() && msg.react(cfg.Emoji.RedEmoji)));}}
