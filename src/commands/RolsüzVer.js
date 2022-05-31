module.exports = {
    conf: {
      aliases: ["norole"],
      name: "rolsüz",
      usage: 'rolsüz [ver]',
      description: 'Sunucuda rolü olmayanlara kayıtsız rolünü verirsiniz.',
   },
  
   run: async ({client, msg, args, cfg, author, uye}) => {
     
    if (!msg.member.roles.cache.some(r => cfg.Hammer.Other.includes(r.id)) && !msg.member.hasPermission(8)) return client.timemessage(client.yetersizYetki(msg, msg), msg.channel.id, 5000) 
    if(args[0] === "ver") {
    client.guilds.cache.get(cfg.Server.GuildID).members.cache.filter(uye => uye.roles.cache.size === 1).array().forEach((uye, index) => 
     uye.roles.add(cfg.Roles.KayıtsızRolü).catch(() => { }))
    client.react(msg, "tick") 
    client.message(client.normalEmbed(`Başarıyla sunucuda rolü olmayan \`${client.guilds.cache.get(cfg.Server.GuildID).members.cache.filter(uye => uye.roles.cache.size === 1).size}\` üyeye <@&${cfg.Roles.KayıtsızRolü[0]}> rolü başarıyla verildi.`, msg), msg.channel.id)}}}
