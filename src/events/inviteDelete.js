const client = global.client;

module.exports = async (invite) => {
  
  const gi = client.invites.get(invite.guild.id);
  gi.delete(invite.code);
  client.invites.delete(invite.guild.id, gi);
  console.log(`${invite.code} daveti silindi, davet sistemden kaldırıldı!`)}

module.exports.conf = {
  name: "inviteDelete",
};
