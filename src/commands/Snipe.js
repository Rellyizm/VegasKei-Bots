module.exports = {
  conf: {
    aliases: ["snp"],
    name: "snipe",
    usage: 'snipe',
    description: 'Komutu kullandığınız kanalda en son silinen mesajı gösterir.',
},

 run: async ({client, msg, args, cfg, author, MessageEmbed, uye, moment, MsgDeleteDatabase}) => {
 
  let Channel = msg.mentions.channels.first() || msg.guild.channels.cache.get(args[0]);
  if(!Channel) {
  let MsgDeleteData = await MsgDeleteDatabase.findOne({guildID: msg.guild.id, channelID: msg.channel.id})   
  if(!(MsgDeleteData && MsgDeleteData.msg)) return client.timemessage(client.normalEmbed(`Veritabanında bu kanala ait silinmiş bir mesaj bulamıyorum.`, msg), msg.channel.id, 5000)
  let list = MsgDeleteData && MsgDeleteData.msg ? MsgDeleteData.msg.map((value, index) => `\`⦁\` Üye: <@!${value.userID}>\n\`⦁\` Mesaj İçeriği: ${value.msg.length >= 100 ? "Mesaj uzun olduğu için gösteremiyorum." : value.msg.replace("`", "")}\n\`⦁\` Mesaj Silinme Tarihi: ${moment(value.date).locale("TR").format("LLL")} (${moment(value.date).locale("TR").fromNow()})`).reverse().slice(0, 3).join("\n─────────────────\n") : ""
  client.message(client.normalEmbed(`${msg.channel} kanalında silinen son **3 mesaj:**\n\n ${list}`, msg), msg.channel.id)
  return}
  if(client.channels.cache.get(Channel.id).type === "voice") return client.message(client.normalEmbed(`Metin kanalı ID'si belirtmelisin.`, msg), msg.channel.id)
  if(client.channels.cache.get(Channel.id).type === "category") return client.message(client.normalEmbed(`Metin kanalı ID'si belirtmelisin.`, msg), msg.channel.id)
  let MsgDeleteData = await MsgDeleteDatabase.findOne({guildID: msg.guild.id, channelID: Channel.id})
  if(!(MsgDeleteData && MsgDeleteData.msg)) return client.timemessage(client.normalEmbed(`Veritabanında bu kanala ait silinmiş bir mesaj bulamıyorum.`, msg), msg.channel.id, 5000)
  let list = MsgDeleteData && MsgDeleteData.msg ? MsgDeleteData.msg.map((value, index) => `\`⦁\` Üye: <@!${value.userID}>\n\`⦁\` Mesaj İçeriği: ${value.msg.length >= 100 ? "Mesaj uzun olduğu için gösteremiyorum." : value.msg.replace("`", "")}\n\`⦁\` Mesaj Silinme Tarihi: ${moment(value.date).locale("TR").format("LLL")} (${moment(value.date).locale("TR").fromNow()})`).reverse().slice(0, 3).join("\n─────────────────\n") : ""
  client.message(client.normalEmbed(`${client.channels.cache.get(Channel.id)} kanalında silinen son **3 mesaj:**\n\n ${list}`, msg), msg.channel.id)}}
