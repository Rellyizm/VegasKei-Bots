module.exports = {
  conf: {
    aliases: ["invite", "invites", "davet"],
    name: "davetrank",
    usage: 'invites [üye] // !davet [ekle/sil] [üye] [1] // !davet sorgu [üye]',
    description: "Belirttiğiniz üyenin davet verilerine bakarsınız."
  },

  run: async ({client, msg, args, inviteMemberData, inviterData, MessageEmbed, moment, cfg}) => {
    
    let seçenek = args[0]
    let denetlenecek = ["ekle","add","Ekle","EKLE","Add","ADD","sil","delete","SIL","Sil","Delete","DELETE","SORGU","Sorgu","query","sorgu"]
    if(!denetlenecek.some(x => seçenek === x)) { 
    const member = msg.mentions.members.first() || msg.guild.members.cache.get(args[0]) || msg.member;
    const inviteData = await inviterData.findOne({ guildID: msg.guild.id, userID: member.user.id });
    if(!inviteData) return msg.channel.send(new MessageEmbed().setAuthor(member.displayName, member.user.avatarURL({ dynamic: true })).setColor(client.vegasRenkler[Math.floor(Math.random() * client.vegasRenkler.length)]).setDescription(`${member} üyesinin hiç daveti yok!`))
    const total = inviteData ? inviteData.total : 0;
    const vegas1 = inviteData ? inviteData.regular : 0;
    const bonus = inviteData ? inviteData.bonus : 0;
    const leave = inviteData ? inviteData.leave : 0;
    const fake = inviteData ? inviteData.fake : 0;
    const regular = vegas1 - leave - fake
    const invMember = await inviteMemberData.find({ guildID: msg.guild.id, inviter: member.user.id });
    const embed = new MessageEmbed()
     .setAuthor(member.displayName, member.user.avatarURL({ dynamic: true }))
     .setColor(member.displayHexColor)
     .setDescription(`${member} üyesi;\n\nToplamda **${total}** daveti var. (**${regular > 0 ? regular : 0}** regular, **${bonus}** bonus, **${fake}** fake, **${leave}** ayrılan)`);
    msg.channel.send(embed)   
    return}
    if (seçenek === "ekle" || seçenek === "add" || seçenek === "Ekle" || seçenek === "EKLE" || seçenek === "Add" || seçenek === "ADD") {
    const member = msg.mentions.members.first() || msg.guild.members.cache.get(args[1]) 
    if (!msg.member.hasPermission(8)) return;
    if (!member) return client.timemessage(client.normalEmbed(`Lütfen tüm argümanları doğru giriniz.\n\n**Örnek Kullanım:**\n \`!davet ekle/sil [üye] [1]\`\n\`!davet sorgu [üye]\``, msg), msg.channel.id, 5000)
    const amount = args[2];
    if (!amount) return client.timemessage(client.normalEmbed(`Eklenecek **davet** sayısını belirtmelisin.`, msg), msg.channel.id, 5000)
    await inviterData.findOneAndUpdate({ guildID: member.guild.id, userID: member.user.id }, { $inc: { total: parseInt(amount), bonus: parseInt(amount) } }, { upsert: true });
    client.timemessage(client.normalEmbed(`${member.toString()} üyesine \`${amount}\` adet **bonus davet** eklendi.`, msg), msg.channel.id, 5000)
    } else if (seçenek === "sil" || seçenek === "delete" || seçenek === "SIL" || seçenek === "Sil" || seçenek === "Delete" || seçenek === "DELETE") {
    const member = msg.mentions.members.first() || msg.guild.members.cache.get(args[1]) 
    if (!msg.member.hasPermission(8)) return;
    if (!member) return client.timemessage(client.normalEmbed(`Lütfen tüm argümanları doğru giriniz.\n\n**Örnek Kullanım:**\n \`!davet [ekle/sil] [üye] [1]\`\n\`!davet sorgu [üye]\``, msg), msg.channel.id, 5000)
    const amount = args[2];
    if (!amount || isNaN(amount)) return client.timemessage(client.normalEmbed(`Silinecek **davet** sayısını belirtmelisin.`, msg), msg.channel.id, 5000)
    const data = await inviterData.findOne({ guildID: msg.guild.id, userID: member.user.id });
    if (!data) return client.timemessage(client.normalEmbed(`Bu kullanıcının veritabanında hiç daveti olmadığı için işlem gerçekleştirilemedi.`, msg), msg.channel.id, 5000)
    else {
     if(data.bonus === 0) return client.timemessage(client.normalEmbed(`Bu kullanıcının veritabanında hiç bonus daveti olmadığı için işlem gerçekleştirilemedi.`, msg), msg.channel.id, 5000)
     if(data.bonus-amount < 0) return client.timemessage(client.normalEmbed(`Bonus davet çıkarınca 0'ın altına düştüğü için işlem gerçekleştirilemedi.`, msg), msg.channel.id, 5000)
     data.total -= parseInt(amount);
     data.bonus -= parseInt(amount);
     data.save();}
    client.timemessage(client.normalEmbed(`${member.toString()} üyesinden \`${amount}\` adet **bonus davet** çıkarıldı!`, msg), msg.channel.id, 5000)
    } else if (seçenek === "sorgu" || seçenek === "query" || seçenek === "Sorgu" || seçenek === "SORGU") {
    const member = msg.mentions.members.first() || msg.guild.members.cache.get(args[2]) || msg.member;
    const data = await inviteMemberData.findOne({ guildID: msg.guild.id, userID: member.user.id });
    if (!data) return client.timemessage(client.normalEmbed(`Veritabanında bu kullanıcıyı kimin davet ettiğini bulamıyorum.`, msg), msg.channel.id, 5000)
    else {
    const inviter = await client.users.fetch(data.inviter);
    client.message(client.normalEmbed(`${member.toString()} üyesi;\n\n\`⦁\` Profil: ${member} (\`${member.user.tag}\` - \`${member.id}\`) \n \`⦁\` Katılım Tarihi: \`${moment(data.date).locale("TR").format("LLL")}\` (\`${moment(data.date).locale("TR").fromNow()}\`)\n \`⦁\` Davet Eden: ${inviter} (\`${inviter.tag}\` - \`${inviter.id}\`)`, msg), msg.channel.id)}}}}
