module.exports = {
  conf: {
    aliases: ["taglistetop","tagtop","taglıtop"],
    name: "tagaldıtop",
    usage: 'tagaldıtop',
    description: 'Sunucu da top 20 en çok tag aldıran üyeleri görürsünüz.',
},

 run: async ({client, msg, args, cfg, author, uye, ControlsDatabase, StaffDatabase}) => {
   
  if (!msg.member.roles.cache.some(r => cfg.Hammer.Other.includes(r.id)) && !msg.member.roles.cache.some(r => cfg.Hammer.BotCommands.includes(r.id)) &&!msg.member.hasPermission(8)) return client.timemessage(client.yetersizYetki(msg, msg), msg.channel.id, 5000)                              
 
    let tagaldıData = await StaffDatabase.find({ guildID: msg.guild.id }).sort({ tagaldıtotal: -1 });
    let totalRegData = await ControlsDatabase.findOne({ guildID: msg.guild.id})
    if (!tagaldıData.length) return client.timemessage(client.normalEmbed("Veritabanında kayıt verisi bulunamadı.", msg), msg.channel.id, 5000);
    let arr = [];
    tagaldıData.forEach((x) => arr.push({ id: x.userID, total: x.tagaldıtotal }));
    let index = arr.findIndex((x) => x.id == msg.author.id) + 1;
    let sıralama = tagaldıData
    .filter((x) => msg.guild.members.cache.has(x.userID))
    .splice(0, 20)
    .map((x, index) => `${x.userID === msg.author.id ? `\`${index + 1}.\` <@${x.userID}> \`${x.tagaldıtotal} Üye.\` (**Siz**)` : `\`${index + 1}.\` <@${x.userID}> \`${x.tagaldıtotal} Üye.\``}`)
    .join("\n");
    const authorData = await StaffDatabase.findOne({ guildID: msg.guild.id, userID: msg.author.id });
    client.message(client.normalEmbed(`Top 20 tag aldırma sıralaması aşağıda belirtilmiştir.\nBu hafta toplam \`${totalRegData && totalRegData.haftalıktaglı ? totalRegData.haftalıktaglı : 0}\` tag aldırma işlemi yapıldı!\n\n ${sıralama}\n\n${index === 0 ? `Siz sıralamada bulunmuyorsunuz.` : `Siz ${index}. sırada bulunuyorsunuz. Toplam ${authorData && authorData.tagaldıtotal ? authorData.tagaldıtotal : 0} üyeye tag aldırmışsınız.`}`, msg), msg.channel.id)
    client.react(msg, "tick")}}
