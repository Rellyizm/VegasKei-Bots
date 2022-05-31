module.exports = {
  conf: {
    aliases: ["list","liste"],
    name: "sayı",
    usage: 'sayı [kelime]',
    description: 'Belirttiğiniz kelimenin sunucu da kimlerin isminde olduğunu ve sayısını görürsünüz.',
 },
  
 run: async ({client, msg, args, cfg, author, MessageEmbed}) => {
   
  let kelime = args[0]
  if(!kelime) return client.timemessage(client.normalEmbed(`Bir kelime belirtmelisin.`, msg), msg.channel.id, 5000)
  const filter = (reaction, user) => {return ["👌"].includes(reaction.emoji.name) && user.id === msg.author.id;};
  if(msg.guild.members.cache.filter(r=>r.user.username.includes(kelime)).size === 0) return client.timemessage(client.normalEmbed(`Kullanıcı isminde \`${kelime}\` geçen kullanıcı yok.`, msg), msg.channel.id, 5000)
  msg.channel.send(`Adında \`${kelime}\` geçen toplamda ${msg.guild.members.cache.filter(r=>r.user.username.includes(kelime)).size} kişi var. Tüm üyeleri görmek istiyorsanız 👌 emojisine basınız.\n\n30 saniye içinde iptal edilecektir.`).then(m => m.react("👌").then(s =>m.awaitReactions(filter, { max: 1, time: 30000, errors: ["time"] }).then(collected => {const reaction = collected.first()
  if (reaction.emoji.name === "👌") {let vegas = 1   
  m.reactions.removeAll() && m.edit(`Adında \`${kelime}\` geçen kullanıcılar alt tarafta gösteriliyor.`)
  let embed = new MessageEmbed().setColor(client.vegasRenkler[Math.floor(Math.random() * client.vegasRenkler.length)]).setAuthor(client.user.tag, client.user.avatarURL({dynamic:true})); 
  let atilacak = `${client.users.cache.filter(user => user.tag.toLowerCase().includes(kelime.toLowerCase())).map(x => `\`${vegas++}.\` ${x.tag} - (\`${x.id}\`)`).join('\n')}`; 
  for (var i = 0; i < (Math.floor(atilacak.length/2040)); i++) {msg.channel.send(embed.setDescription(atilacak.slice(0, 2040)));
  atilacak = atilacak.slice(2040);};if (atilacak.length > 0) msg.channel.send(embed.setDescription(atilacak));}})).catch(() => m.delete()))}}
