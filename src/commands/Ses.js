module.exports = {
  conf: {
    aliases: ["sesli","voice"],
    name: "ses",
    usage: 'sesli',
    description: 'Sunucunun ses aktifliği hakkında detaylı bilgi alırsınız.',
},

 run: async ({client, msg, args, cfg, author, MessageEmbed, uye}) => {
   
  if (!msg.member.roles.cache.some(r => cfg.Hammer.Other.includes(r.id)) && !msg.member.roles.cache.has(cfg.Tag.TagRolü) && !msg.member.hasPermission(8)) return client.timemessage(client.yetersizYetki(msg, msg), msg.channel.id, 5000)                              
  const voiceChannels = msg.guild.channels.cache.filter(c => c.type === "voice");
  let ses = msg.guild.members.cache.filter(x => x.voice.channel).size 
  let pub = msg.guild.members.cache.filter(x => x.voice.channel && x.voice.channel.parent.id == cfg.Channels.PublicCategory).size
  let tagges = msg.guild.members.cache.filter(x => {
   return cfg.Tag.Tags.some(q => x.user.tag.includes(q)) && x.voice.channel && !x.roles.cache.some(r => cfg.Roles.YetkiliRolleri.includes(r.id))
  }).size
  let notag = msg.guild.members.cache.filter(x => {
   return !cfg.Tag.Tags.some(q => x.user.tag.includes(q)) && x.voice.channel
  }).size
  let yetkili = msg.guild.members.cache.filter(x => {
   return cfg.Tag.Tags.some(q => x.user.tag.includes(q)) && x.voice.channel && x.roles.cache.some(r => cfg.Roles.YetkiliRolleri.includes(r.id))
  }).size
  let yayın = msg.guild.members.cache.filter(x => {
   return (x.voice.streaming === true) && x.voice.channel 
  }).size
  let mic = msg.guild.members.cache.filter(x => {
   return (x.voice.selfMute == true) && x.voice.channel
  }).size  
  let kulaklık = msg.guild.members.cache.filter(x => {
   return (x.voice.selfDeaf == true) && x.voice.channel
  }).size
  let bot = msg.guild.members.cache.filter(x => {
   return x.user.bot && x.voice.channel 
  }).size

  let array = []
  if(args[0]) {
  if(args[0].toLowerCase().includes("detay")) {
  msg.guild.members.cache.filter(x => x.voice.channel && !array.find(s => s.name === x.voice.channel.parent.name) && array.push({name: x.voice.channel.parent.name, count: msg.guild.members.cache.filter(q => q.voice.channel && q.voice.channel.parent.id == x.voice.channel.parent.id).size}))
  msg.channel.send(new MessageEmbed()
  .setDescription(`
  Sesli kanallarda toplamda **${ses}** kişi var !
  ───────────────
  Public odalarda **${pub}** kişi var !
  Ses kanallarında **${notag}** normal kullanıcı var !
  Ses kanallarında **${tagges}** taglı kullanıcı var !
  Ses kanallarında **${yetkili}** yetkili var !
  ───────────────
  Sesli kanallarında **${yayın}** kişi yayın yapıyor.
  Mikrofonu Kapalı: **${mic}**
  Kulaklığı Kapalı: **${kulaklık}**
  Bot: **${bot}**
  ───────────────
  Top **3** kategori sırası;
  ${array.sort((x, y) => y.count - x.count).map((q, i) => "\`"+ (i+1) +".\` #"+q.name+": **"+q.count+"**").slice(0, 5).join("\n")}
 `).setColor(msg.member.displayHexColor).setThumbnail(msg.guild.iconURL({dynamic:true})).setAuthor(msg.guild.name, msg.guild.iconURL({dynamic:true})))}
  }else{
  msg.channel.send(new MessageEmbed()
  .setDescription(`
  Sesli kanallarda toplamda **${ses}** kişi var !
  ───────────────
  Public odalarda **${pub}** kişi var !
  Ses kanallarında **${notag}** normal kullanıcı var !
  Ses kanallarında **${tagges}** taglı kullanıcı var !
  Ses kanallarında **${yetkili}** yetkili var !`).setColor(msg.member.displayHexColor))}}}
