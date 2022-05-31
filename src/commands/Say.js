module.exports = {
  conf: {
    aliases: [],
    name: "say",
    usage: 'say',
    description: 'Sunucu hakkında detaylı bilgi alırsınız.',
},

 run: async ({client, msg, args, cfg, author, MessageEmbed, uye}) => {
   
  if (!msg.member.roles.cache.has(cfg.Tag.TagRolü) && !msg.member.hasPermission(5)) return client.timemessage(client.yetersizYetki(msg, msg), msg.channel.id, 5000)                              
  var tag1 = msg.guild.members.cache.filter(a => a.user.username.toLowerCase().includes("wénc")).size;
  var tag2 = msg.guild.members.cache.filter(a => a.user.username.toLowerCase().includes("wenc")).size;
  //var tag3 = msg.guild.members.cache.filter(a => a.user.username.toLowerCase().includes("rèwînd")).size;
  //var tag4 = msg.guild.members.cache.filter(demir => demir.user.username.toLowerCase().includes("réwind")).size;
  //var tag5 = msg.guild.members.cache.filter(demir => demir.user.username.toLowerCase().includes("réwînd")).size;
  var toplamAile = msg.guild.members.cache.filter(s => !s.bot).filter(member => member.user.discriminator === "1934").size;
 
  const vegas = new MessageEmbed().setColor(client.vegasRenkler[Math.floor(Math.random() * client.vegasRenkler.length)]).setDescription(`\`•\` Seste toplam **${msg.guild.channels.cache.filter(channel => channel.type == "voice").map(channel => channel.members.size).reduce((a, b) => a + b)}** kullanıcı var.\n\`•\` Toplam **${toplamAile+tag1+tag2}** kişi tagımıza sahip.\n\`•\` Sunucumuzda toplam **${msg.guild.memberCount}** üye var.\n\`•\` Sunucumuza toplam **${msg.guild.premiumSubscriptionCount}** takviye yapılmış.`)
  msg.channel.send(vegas)}}
