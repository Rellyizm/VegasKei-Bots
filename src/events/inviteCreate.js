const client = global.client;

module.exports = async (invite) => {
  const gi = client.invites.get(invite.guild.id);
  gi.set(invite.code, invite);
  client.invites.set(invite.guild.id, gi);
  console.log(`${invite.inviter.tag} tarafından ${invite.code} daveti oluşturuldu, davet sisteme tanımlandı!`)
};

module.exports.conf = {
  name: "inviteCreate",
};
