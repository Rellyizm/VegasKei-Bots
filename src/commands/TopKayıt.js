module.exports = {
  conf: {
    aliases: ["kayıttop"],
    name: "topkayıt",
    usage: 'topkayıt',
    description: 'Sunucu da en çok kayıt yapan ilk 20 kişiyi ve kayıt verilerini görürsünüz.',
 },

 run: async ({client, msg, args, cfg, author, uye, guild, MessageEmbed, StaffDatabase, ControlsDatabase}) => {
   
    let registerData = await StaffDatabase.find({ guildID: msg.guild.id }).sort({ toplamkayıt: -1 });
    let totalRegData = await ControlsDatabase.findOne({ guildID: msg.guild.id})
    if (!registerData.length) return client.timemessage(client.normalEmbed("Veritabanında kayıt verisi bulunamadı.", msg), msg.channel.id, 5000);
    let arr = [];
    registerData.forEach((x) => arr.push({ id: x.userID, total: x.toplamkayıt }));
    let index = arr.findIndex((x) => x.id == msg.author.id) + 1;
    let sıralama = registerData
    .filter((x) => msg.guild.members.cache.has(x.userID))
    .splice(0, 20)
    .map((x, index) => `${x.userID === msg.author.id ? `\`${index + 1}.\` <@${x.userID}> \`${x.toplamkayıt} Kayıt.\` (**Siz**)` : `\`${index + 1}.\` <@${x.userID}> \`${x.toplamkayıt} Kayıt.\``}`)
    .join("\n");
    const authorData = await StaffDatabase.findOne({ guildID: msg.guild.id, userID: msg.author.id });
    client.message(client.normalEmbed(`Top 20 kayıt sıralaması aşağıda belirtilmiştir.\nBu hafta toplam \`${totalRegData && totalRegData.haftalıkkayıt ? totalRegData.haftalıkkayıt : 0}\` kayıt işlemi yapıldı!\n\n ${sıralama}\n\n${index === 0 ? `Siz sıralamada bulunmuyorsunuz.` : `Siz ${index}. sırada bulunuyorsunuz. Toplam ${authorData && authorData.erkekkayıt ? authorData.erkekkayıt : 0} erkek, ${authorData && authorData.kızkayıt ? authorData.kızkayıt : 0} kadın kaydetmişsiniz.`}`, msg), msg.channel.id)
    client.react(msg, "tick")}}
