const { MessageEmbed } = require("discord.js");

module.exports = {
  conf: {
    aliases: ["invtop", "invite-top", "davet-top", "davettop","topdavet","invitetop"],
    name: "invitestop",
    usage: 'davettop',
    description: "Sunucuda ki top 10 davet sıralamasını görürsünüz."
  },

  run: async ({client, msg, args, embed, inviterData}) => {
    
    let data = await inviterData.find({ guildID: msg.guild.id }).sort({ total: -1 });
    if (!data.length) return client.timemessage(client.normalEmbed("Veritabanında invite verisi bulunamadı.", msg), msg.channel.id, 5000);
    let arr = [];
    data.forEach((x) => arr.push({ id: x.userID, total: x.total }));
    let index = arr.findIndex((x) => x.id == msg.author.id) + 1;
    let list = data
     .filter((x) => msg.guild.members.cache.has(x.userID))
     .splice(0, 10)
     .map((x, index) => `${x.userID === msg.author.id ? `\`${index + 1}.\` <@${x.userID}> Toplam **${x.total}** daveti var. (**${x.regular-x.fake-x.leave}** normal, **${x.fake}** sahte, **${x.leave}** ayrılan, **${x.bonus}** bonus) (**Siz**)` : `\`${index + 1}.\` <@${x.userID}> Toplam **${x.total}** daveti var. (**${x.regular-x.fake-x.leave}** normal, **${x.fake}** sahte, **${x.leave}** ayrılan, **${x.bonus}** bonus)`}`)
     .join("\n");
    const veri = await inviterData.findOne({ guildID: msg.guild.id, userID: msg.author.id });
    if (index < 10) {
     msg.channel.send(new MessageEmbed().setDescription(list).setTitle("Davet Sıralaması:").setFooter("Juqest was here")); 
    } else {
     msg.channel.send(new MessageEmbed().setDescription(`${list} \n\nSiz **${index}.** sırada bulunuyorsunuz. Toplam **${veri.total}** davetiniz var. (**${veri.regular-veri.fake-veri.leave}** normal, **${veri.fake}** sahte, **${veri.leave}** ayrılan, **${veri.bonus}** bonus)`).setTitle("Davet Sıralaması:").setFooter("Juqest was here"))}}}