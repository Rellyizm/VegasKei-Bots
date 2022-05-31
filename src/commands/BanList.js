module.exports = {
  conf: {
    aliases: ["banlist"],
    name: "banliste",
    usage: 'banliste',
    description: 'Sunucuda atılan banları gösterir.',
  },

 run: async ({client, msg, args, cfg, author}) => {
   
  if (!msg.member.roles.cache.some(r => cfg.Hammer.Ban.includes(r.id)) && !msg.member.hasPermission(8)) return client.message(client.yetersizYetki(msg, msg), msg.channel.id, 5000)
  msg.guild.fetchBans().then(bans => {if(bans.size >= 30){client.message(client.normalEmbed(`Sunucuda toplamda ${bans.size} yasaklı kullanıcı bulunmakta.\n\n${bans.size > 0 ? bans.map(z => `30 dan fazla banlanmış kullanıcı olduğu için banlananları gösteremiyorum.`).join("\n") : "Bu Sunucuda Mevcut Yasaklama Bulunmuyor."}`, msg), msg.channel.id);}
  if(bans.size < 30){client.message(client.normalEmbed(`Sunucuda toplamda ${bans.size} yasaklı kullanıcı bulunmakta.\n\n ${bans.size > 0 ? bans.map(z => `${z.user.tag.replace("`", "")} - \`${z.user.id}\``).join("\n") : "Bu Sunucuda Mevcut Yasaklama Bulunmuyor."}`, msg), msg.channel.id);}})}}