module.exports = {
  conf: {
    aliases: ["tagliste","taglıliste"],
    name: "tagaldıliste",
    usage: 'tagliste [üye]',
    description: 'Belirttiğiniz kullanıcının !tagaldı komutunu kullanarak tag aldırdığı kişileri görürsünüz.',
},

 run: async ({client, msg, args, cfg, author, MessageEmbed, StaffDatabase, moment}) => {
   
  if (!msg.member.roles.cache.some(r => cfg.Hammer.Other.includes(r.id)) && !msg.member.roles.cache.some(r => cfg.Hammer.BotCommands.includes(r.id)) &&!msg.member.hasPermission(8)) return client.timemessage(client.yetersizYetki(msg, msg), msg.channel.id, 5000)                              
  let uye = msg.mentions.members.first() || msg.guild.members.cache.get(args[0]) || msg.author
  const TagAldıData = await StaffDatabase.findOne({ guildID: msg.guild.id, userID: uye.id});
  if(!(TagAldıData && TagAldıData.tagaldı)) return client.message(client.normalEmbed(`Veritabanımda size ait bir tag aldırma verisi bulamıyorum.`, msg), msg.channel.id)   
  let liste = TagAldıData && TagAldıData.tagaldı.map((value, index) => `\`${index+1}.\` <@!${value.id}> │ ${value.id} | ${moment(value.date).locale("TR").format("LLL")} (${moment(value.date).locale("TR").fromNow()})`).reverse().slice(0, 10).join("\n") 
  let VegasEmbed1 = new MessageEmbed().setAuthor(`${msg.guild.name} Tag Aldırma Sistemi`, msg.guild.iconURL({dynamic: true})).setDescription(`${TagAldıData && TagAldıData.tagaldıtotal ? `${uye} üyesinin tag aldırdığı son 10 üye gösteriliyor; **(${TagAldıData.tagaldıtotal})**\n\n**Sunucuda bulunanlar;**\n`: ""} ${liste}`)
  msg.channel.send(VegasEmbed1)   
  client.react(msg, "tick")}}
