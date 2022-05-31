module.exports = {
  conf: {
    aliases: ["booster","zengin","boost","bnick","bisim"],
    name: "asdasdasas",
    usage: 'me [isim]',
    description: 'Boost basan kullanıcılar bu komutla isimlerini değiştirebilir.',
},

 run: async ({client, msg, args, cfg, author, MessageEmbed, uye}) => {
   
  if (!msg.member.roles.cache.has(cfg.Roles.BoosterRolü)) return client.timemessage(client.yetersizYetki(msg, msg), msg.channel.id, 5000)                              
  let yecep = args.slice(0).join(' ') 
  if (yecep && (await client.chatKoruma(yecep)) || yecep.toLowerCase().includes("@here") || yecep.toLowerCase().includes("@everyone")) return client.timemessage(client.normalEmbed(`Geçerli bir isim belirtmelisin.`, msg), msg.channel.id, 5000)
  if (!yecep) return client.timemessage(client.normalEmbed(`Lütfen tüm argümanları doğru giriniz.\nÖrnek Kullanım: !me [İsim]`, msg), msg.channel.id, 5000)
  msg.member.setNickname(`${yecep}`).catch(() => { })
  client.timemessage(client.normalEmbed(`Başarıyla kullanıcı adınız değişti.`, msg), msg.channel.id, 5000)
  client.react(msg, "tick")}}