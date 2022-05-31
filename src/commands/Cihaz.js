module.exports = {
  conf: {
    aliases: [],
    name: "cihaz",
    usage: 'cihaz [üye]',
    description: 'Belirttiğiniz kullanıcının discorda hangi cihazdan girdiğini görürsünüz.',
},

 run: async ({client, msg, args, cfg, author, MessageEmbed}) => {
   
  let user = msg.mentions.users.first() || client.users.cache.get(args[0]) || msg.author;
  const uye = msg.guild.member(user) || msg.guild.members.cache.get(args[0])
  if(uye.presence.status === "offline") return client.timemessage(client.normalEmbed(`\`${uye.user.tag}\` kullanıcısı çevrimdışı olduğundan dolayı cihaz bilgisini tespit edemiyorum.`, msg), msg.channel.id, 5000)
  let p = Object.keys(uye.presence.clientStatus).join(',')
  let cihazisim = p
  .replace(`mobile`,`Mobil Telefon`)
  .replace(`desktop`,`Bilgisayar (Uygulama)`)
  .replace(`web`,`İnternet Tarayıcısı`)
  msg.channel.send(`${uye.user.tag.replace("`","")} üyesinin şuanda kullandığı cihaz: \`${cihazisim}\``);}}