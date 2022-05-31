const { MessageEmbed } = require("discord.js");

module.exports = {
  conf: {
    aliases: ["members","üyeler","Members","davetlerim","davetlerim"],
    name: "üyelerim",
    usage: 'üyelerim [üye]',
    description: "Belirttiğiniz üyenin davet ettiği üyeleri ve ne zaman davet ettiklerini görürsünüz."
  },

  run: async ({client, msg, args, embed, inviteMemberData, moment, cfg}) => {
    
    const victim = msg.mentions.members.first() || msg.guild.members.cache.get(args[0]) || msg.member;
    const data = await inviteMemberData.find({ guildID: msg.guild.id, inviter: victim.user.id });
    const filtered = data.filter(x => msg.guild.members.cache.get(x.userID));
    let msj = filtered.length > 0 ? filtered.map((m ,i) => `\`${i+1}.\` <@${m.userID}> üyesini \`${moment(m.date).locale('TR').format("LLL")}\` (\`${moment(m.date).locale('TR').fromNow()}\`) tarihinde sunucuya davet etmiş.`).join("\n") : `${victim} üyesinin veritabanında davet verisi bulunamadı.`
    for (var i = 0; i < (Math.floor(msj.length/2040)); i++) {
    msg.channel.send(new MessageEmbed().setDescription(msj.slice(0, 2040)));
    msj = msj.slice(2040);}
    if (msj.length > 0) msg.channel.send(new MessageEmbed().setDescription(msj))}}
