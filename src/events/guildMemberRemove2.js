const client = global.client;
const inviterSchema = require("../schemas/inviter");
const inviteMemberSchema = require("../schemas/inviteMember");
const cfg = require("../configs/config.json");

module.exports = async (member) => {
  
  const channel = member.guild.channels.cache.get(cfg.Channels.InvLog);
  if (!channel) return;
  if (member.user.bot) return;

  const inviteMemberData = await inviteMemberSchema.findOne({ guildID: member.guild.id, userID: member.user.id });
  if (!inviteMemberData) {
    channel.send(`\`${member.user.tag}\` sunucudan çıkış yaptı. Veritabanında kullanıcıyı davet eden üye bulunamadı.`);
  } else {
    const inviter = await client.users.fetch(inviteMemberData.inviter);
    let kullanıcı = member.guild.member(member.guild.members.cache.get(inviter.id))
    await inviterSchema.findOneAndUpdate({ guildID: member.guild.id, userID: inviter.id }, { $inc: { total: -1 } }, { upsert: true });
    const inviterData = await inviterSchema.findOne({ guildID: member.guild.id, userID: inviter.id, });
    const total = inviterData ? inviterData.total : 0;
    await channel.send(`${inviter} tarafından davet edilen \`${member.user.tag.replace("`","")}\` sunucudan çıktı. (${inviter} \`${total === -1 ? 0 : total}\` toplam davete sahip oldu.)`); }}

module.exports.conf = {
  name: "guildMemberRemove",
};