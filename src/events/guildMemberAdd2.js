const client = global.client;
const { Collection, MessageEmbed } = require("discord.js");
const inviterSchema = require("../schemas/inviter");
const inviteMemberSchema = require("../schemas/inviteMember");
const cfg = require("../configs/config.json");
const humanizeDuration = require("humanize-duration")
const moment = require("moment");
require("moment-duration-format");
const Puan = require("../schemas/Puan");
const coinDatabase = require("../schemas/Coin");
const görevDatabase = require("../schemas/Görev");

module.exports = async (member) => {
  
  const invchannel = member.guild.channels.cache.get(cfg.Channels.InvLog);
  if (!invchannel) return;
  const regchannel = member.guild.channels.cache.get(cfg.Channels.Register);
  if (!regchannel) return;
  const newAccChannel = member.guild.channels.cache.get(cfg.Channels.newAcc);
  if (!newAccChannel) return;
  if (member.user.bot) return;
  const gi = client.invites.get(member.guild.id).clone() || new Collection().clone();
  const invites = await member.guild.fetchInvites();
  const invite = invites.find((x) => gi.has(x.code) && gi.get(x.code).uses < x.uses) || gi.find((x) => !invites.has(x.code)) || member.guild.vanityURLCode;
  client.invites.set(member.guild.id, invites);
  
  await member.roles.add(cfg.Roles.Unregister).catch(() => { })
  await member.roles.add(cfg.Roles.Unregister).catch(() => { })
  await member.roles.add(cfg.Roles.Unregister).catch(() => { })
  
  
  
  if (invite === member.guild.vanityURLCode) {
  member.guild.fetchVanityData().then(res => { 
  invchannel.send(` ${member} katıldı! **Davet eden:** Özel URL (${member.guild.vanityURLCode}: \`${res.uses}\` kullanım.)`);
  regchannel.send(`:tada:${cfg.Server.WelcomeSunucuİsmi} hoş geldin ${member} !
\nHesabın ${moment(member.user.createdAt).locale("TR").format("LLL")} tarihinde (${moment(member.user.createdAt).locale("TR").fromNow()}) oluşturulmuş.  
\nSunucu kurallarımız <#${cfg.Channels.Rules}> kanalında belirtilmiştir. Unutma sunucu içerisinde ki ceza işlemlerin kuralları okuduğunu varsayarak gerçekleştirilecek.
\nSeninle beraber ${member.guild.memberCount} kişi olduk! Sol tarafta bulunan **V. Confirmed** odalarından birine girerek kayıt işlemini gerçekleştirebilirsin. İyi eğlenceler! 🎉🎉🎉`)})}
 
  if (!invite.inviter) return;
  if (Date.now() - member.user.createdTimestamp <= 1000 * 60 * 60 * 24 * 7) {
    await inviteMemberSchema.findOneAndUpdate({ guildID: member.guild.id, userID: member.user.id }, { $set: { inviter: invite.inviter.id, date: Date.now() } }, { upsert: true });
    await inviterSchema.findOneAndUpdate({ guildID: member.guild.id, userID: invite.inviter.id }, { $inc: { total: 1, fake: 1 } }, { upsert: true });
    const inviterData = await inviterSchema.findOne({ guildID: member.guild.id, userID: invite.inviter.id });
    const total = inviterData ? inviterData.total : 0;
    const vegas1 = inviterData ? inviterData.regular : 0;
    const bonus = inviterData ? inviterData.bonus : 0;
    const leave = inviterData ? inviterData.leave : 0;
    const fake = inviterData ? inviterData.fake : 0;
    const regular = vegas1 - leave - fake
    await member.roles.set([cfg.Roles.NewAcc]).catch(() => { })
    await member.roles.set([cfg.Roles.NewAcc]).catch(() => { })
    newAccChannel.send(new MessageEmbed().setColor("RANDOM").setAuthor(member.user.tag, member.user.avatarURL({dynamic:true})).setDescription(`${member} üyesi sunucuya katıldı fakat hesabı **7** günden önce açıldığı için jaile atıldı!`).addField(`**Hesap Bilgi:**`, `\`⦁\` Profil: ${member} (\`${member.user.tag}\` - \`${member.id}\`)\n\`⦁\` Kuruluş Tarihi: ${moment(member.user.createdAt).locale("TR").format("LLL")} (\`${moment(member.user.createdAt).locale("TR").fromNow()}\`)\n`).addField(`**Davet Bilgi:**`, `\`⦁\` Davet Eden: ${invite === member.guild.vanityURLCode ? `Özel URL ${member.guild.fetchVanityData().then(res =>  `(${member.guild.vanityURLCode}: \`${res.uses}\` kullanım.)`)}` : `${invite.inviter} (\`${invite.inviter.tag}\` - \`${invite.inviter.id}\`)\n\`⦁\` Davet Sayısı: Toplamda **${total}** daveti var. (**${regular > 0 ? regular : 0}** regular, **${bonus}** bonus, **${fake}** fake, **${leave}** ayrılan)`}`))
    regchannel.send(new MessageEmbed().setColor("RANDOM").setAuthor(member.user.tag, member.user.avatarURL({dynamic:true})).setDescription(`${member} üyesi sunucuya katıldı fakat hesabı **7** günden önce açıldığı için jaile atıldı! (${moment(member.user.createdAt).locale("TR").fromNow()})`))
    invchannel.send(` ${member} kullanıcısı ${invite.inviter} tarafından sunucuya davet edildi. (${invite.inviter} \`${total}.\` davetine ulaştı.)`);
  } else {
    await inviterSchema.findOneAndUpdate({ guildID: member.guild.id, userID: invite.inviter.id }, { $inc: { total: 1, regular: 1 } }, { upsert: true });
    const inviterData = await inviterSchema.findOne({ guildID: member.guild.id, userID: invite.inviter.id });
    let kullanıcı = member.guild.member(member.guild.members.cache.get(invite.inviter.id))
    if (cfg.Staff.StaffRoles.some(x => kullanıcı.roles.cache.has(x))) {
    const res = await görevDatabase.findOne({guildID: kullanıcı.guild.id, userID: kullanıcı.id});
    if(res) {
    await görevDatabase.findOneAndUpdate({guildID: kullanıcı.guild.id, userID: kullanıcı.id}, {$inc: {InviteCount: 1}}, {upsert: true})  
    const res = await görevDatabase.findOne({guildID: kullanıcı.guild.id, userID: kullanıcı.id}); 
    let görev = res.Invite.map((q) => q.Count)
    let count = res && res.InvıteCount ? res.InviteCount : 0

    if(count >= görev) {
    if(res.InviteDurum === "Ödül Alındı!") {}else{
    if(res.InviteDurum === "Tamamlandı!") {}else{
    await görevDatabase.findOneAndUpdate({guildID: kullanıcı.guild.id, userID: kullanıcı.id}, {$set: {InviteDurum: "Tamamlandı!"}}, {upsert: true})    
     }}}}
    await Puan.findOneAndUpdate({ guildID: kullanıcı.guild.id, userID: kullanıcı.id }, { $inc: { puan: cfg.Puan.invitePuan} }, { upsert: true });

    await coinDatabase.findOneAndUpdate({ guildID: kullanıcı.guild.id, userID: kullanıcı.id }, { $inc: { coinMonth: cfg.Puan.inviteCoin, coinWeek: cfg.Puan.inviteCoin, coinDaily: cfg.Puan.inviteCoin, Coin: cfg.Puan.inviteCoin} }, { upsert: true });

    const puanData = await Puan.findOne({ guildID: kullanıcı.guild.id, userID: kullanıcı.id });
    if (puanData && client.puanData.some(x => x.puan >= puanData.puan)) {
    let newRank = client.puanData.filter(x => puanData.puan >= x.puan);
    newRank = newRank[newRank.length-1];
    if (newRank && Array.isArray(newRank.role) && !newRank.role.some(x => kullanıcı.roles.cache.has(x)) || newRank && !Array.isArray(newRank.role) && !kullanıcı.roles.cache.has(newRank.role)) {
    const oldRank = client.puanData[client.puanData.indexOf(newRank)-1];
    kullanıcı.roles.add(newRank.role);
    if (oldRank && Array.isArray(oldRank.role) && oldRank.role.some(x => kullanıcı.roles.cache.has(x)) || oldRank && !Array.isArray(oldRank.role) && kullanıcı.roles.cache.has(oldRank.role)) kullanıcı.roles.remove(oldRank.role);
    const maxValue = client.puanData[client.puanData.indexOf(client.puanData.find(x => x.puan >= (puanData ? puanData.puan : 0)))] || client.puanData[client.puanData.length-1];
    const maxValue2 = client.puanData[client.puanData.indexOf(maxValue)-2]    
    try{kullanıcı.guild.channels.cache.get(cfg.Channels.yetkiUp).send(`🎉 ${kullanıcı} tebrikler! Puan sayın bir sonraki yetkiye geçmen için yeterli oldu. <@&${maxValue2.role}> yetkisinden ${Array.isArray(newRank.role) ? newRank.role.map(x => `<@&${x}>`).join(", ") : `<@&${newRank.role}>`} yetkisine terfi edildin!`);
    }catch{kullanıcı.guild.channels.cache.get(cfg.Channels.yetkiUp).send(`🎉 ${kullanıcı} tebrikler! Puan sayın bir sonraki yetkiye geçmen için yeterli oldu. ${Array.isArray(newRank.role) ? newRank.role.map(x => `<@&${x}>`).join(", ") : `<@&${newRank.role}>`} yetkisine terfi edildin!`); }}}}    
    const total = inviterData ? inviterData.total : 0;
    if (invite.inviter.id === member.id) {
    await inviterSchema.findOneAndUpdate({ guildID: member.guild.id, userID: invite.inviter.id}, { $inc: { total: -1, regular: -1 } }, { upsert: true })
    if (cfg.Staff.StaffRoles.some(x => kullanıcı.roles.cache.has(x))) {
    await Puan.findOneAndUpdate({ guildID: member.guild.id, userID: invite.inviter.id }, { $inc: { puan: -cfg.Puan.invitePuan } }, { upsert: true });
    await coinDatabase.findOneAndUpdate({ guildID: kullanıcı.guild.id, userID: kullanıcı.id }, { $inc: { coinMonth: -cfg.Puan.inviteCoin, coinWeek: -cfg.Puan.inviteCoin, coinDaily: -cfg.Puan.inviteCoin, Coin: -cfg.Puan.inviteCoin} }, { upsert: true });
    }
    invchannel.send(` ${member} sunucuya katıldı, kullanıcı kendi kendini davet ettiği için işlem yapılmadı.`)
   } else {
    await inviteMemberSchema.findOneAndUpdate({ guildID: member.guild.id, userID: member.user.id }, { $set: { inviter: invite.inviter.id, date: Date.now() } }, { upsert: true });
    invchannel.send(` ${member} kullanıcısı ${invite.inviter} tarafından sunucuya davet edildi. (${invite.inviter} \`${total}.\` davetine ulaştı.)`);}
    if (total === 1) { 
    regchannel.send(`:tada:${cfg.Server.WelcomeSunucuİsmi} hoş geldin ${member} !
    \nHesabın ${moment(member.user.createdAt).locale("TR").format("LLL")} tarihinde (${moment(member.user.createdAt).locale("TR").fromNow()}) oluşturulmuş.  
    \nSunucu kurallarımız <#${cfg.Channels.Rules}> kanalında belirtilmiştir. Unutma sunucu içerisinde ki ceza işlemlerin kuralları okuduğunu varsayarak gerçekleştirilecek.
    \n${invite.inviter} İlk davetini gerçekleştirerek sunucumuzun ${member.guild.memberCount}. üyesi olmanı sağladı. İyi eğlenceler! 🎉🎉🎉`)
   } else {
    if(total === 0) {
    regchannel.send(`:tada:${cfg.Server.WelcomeSunucuİsmi} hoş geldin ${member} !
    \nHesabın ${moment(member.user.createdAt).locale("TR").format("LLL")} tarihinde (${moment(member.user.createdAt).locale("TR").fromNow()}) oluşturulmuş.  
    \nSunucu kurallarımız <#${cfg.Channels.Rules}> kanalında belirtilmiştir. Unutma sunucu içerisinde ki ceza işlemlerin kuralları okuduğunu varsayarak gerçekleştirilecek.
    \nSeninle beraber ${member.guild.memberCount} kişi olduk! Sol tarafta bulunan **V. Confirmed** odalarından birine girerek kayıt işlemini gerçekleştirebilirsin. İyi eğlenceler! 🎉🎉🎉`)
  }else{
    regchannel.send(`:tada:${cfg.Server.WelcomeSunucuİsmi} hoş geldin ${member} !
    \nHesabın ${moment(member.user.createdAt).locale("TR").format("LLL")} tarihinde (${moment(member.user.createdAt).locale("TR").fromNow()}) oluşturulmuş.  
    \nSunucu kurallarımız <#${cfg.Channels.Rules}> kanalında belirtilmiştir. Unutma sunucu içerisinde ki ceza işlemlerin kuralları okuduğunu varsayarak gerçekleştirilecek.
    \n${invite.inviter} ${total}. davetini gerçekleştirerek sunucumuzun ${member.guild.memberCount}. üyesi olmanı sağladı. İyi eğlenceler!🎉🎉🎉`)}}}}

module.exports.conf = {
  name: "guildMemberAdd",
};