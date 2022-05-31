module.exports = {
  conf: {
    aliases: ["ks","katılımsırası","katılımsıra"],
    name: "join",
    usage: 'join [üye]',
    description: 'Belirttiğiniz kullanıcının sunucuya kaçıncı sırada katıldığını görürsünüz.',
},

 run: async ({client, msg, args, cfg, author, MessageEmbed}) => {
   
  const user = msg.mentions.members.first() || msg.guild.members.cache.get(args[0]) 
  let member = msg.guild.member(user)
  if (!member) return client.timemessage(client.normalEmbed(`Lütfen bir üyeyi etiketle ve tekrar dene!`, msg), msg.channel.id, 5000)
  client.message(client.normalEmbed(`${member} bu sunucuya **${(msg.guild.members.cache.filter(a => a.joinedTimestamp <= member.joinedTimestamp).size).toLocaleString()}.** sırada katılmış!`, msg), msg.channel.id)}}