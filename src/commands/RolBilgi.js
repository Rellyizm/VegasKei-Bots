module.exports = {
  conf: {
    aliases: ["rolb","rb","rolelog"],
    name: "rolbilgi",
    usage: 'rolbilgi [rol]',
    description: 'Belirttiğiniz rol hakkında detaylı bilgi alırsınız.',
},

 run: async ({client, msg, args, cfg, author, MessageEmbed, uye}) => {
   
  if (!msg.member.roles.cache.some(r => cfg.Hammer.Other.includes(r.id)) && !msg.member.hasPermission(8)) return client.timemessage(client.yetersizYetki(msg, msg), msg.channel.id, 5000)                              
  let rol = msg.mentions.roles.first() || msg.guild.roles.cache.get(args[0]) || msg.guild.roles.cache.find(m => m.name === args.slice(0).join(" "))
  if(!rol) return client.timemessage(client.normalEmbed(`Lütfen tüm argümanları doğru giriniz.\nÖrnek Kullanım: !rolbilgi @Rol/ID/Rolisim`, msg), msg.channel.id, 5000)
  msg.channel.send(`- ${rol} rol bilgileri\n- Rol Rengi: \`${rol.hexColor}\`\n- Rol ID: \`${rol.id}\`\n- Rol Kişi Sayısı: \`${rol.members.size}\`\n─────────────────\n- Roldeki Kişiler:\n`)
  let listed = Array.from(rol.members.array().map((val, ind) => `${val} - (\`${val.id}\`)`).values());
   client.chunkArray(listed, 20).forEach(r => {
   msg.channel.send(`${r.join("\n")}`).catch(() => { })})}}
