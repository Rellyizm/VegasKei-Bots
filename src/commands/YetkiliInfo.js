module.exports = {
   conf: {
     aliases: ["yetkiliinfo","ytbilgi","ytinfo","yetkilidurum","ytdurum","yetkilinfo"],
     name: "yetkilibilgi",
     usage: 'yetkilibilgi',
     description: 'Sunucunun yetkili kadrosu hakkında detaylı bilgi alırsınız.',
 },
 
  run: async ({client, msg, args, cfg, author, MessageEmbed, uye}) => {
    
   if (!msg.member.roles.cache.some(r => cfg.Hammer.Other.includes(r.id)) && !msg.member.hasPermission(8)) return client.timemessage(client.yetersizYetki(msg, msg), msg.channel.id, 5000)                              
   let yetkili = msg.guild.members.cache.filter(x => {
    return x.roles.cache.some(r => cfg.Hammer.BotCommands.includes(r.id))
   }).size
   
   let aktif = msg.guild.members.cache.filter(x => {
    return (x.user.presence.status !== "offline") && x.roles.cache.some(r => cfg.Hammer.BotCommands.includes(r.id)) 
   }).size
   
   let çevrimdışı = msg.guild.members.cache.filter(x => {
    return (x.user.presence.status === "offline") && x.roles.cache.some(r => cfg.Hammer.BotCommands.includes(r.id)) 
   }).size
   
   let ses = msg.guild.members.cache.filter(x => {
    return x.voice.channel && x.roles.cache.some(r => cfg.Hammer.BotCommands.includes(r.id)) 
   }).size
   
   let noVoice = msg.guild.members.cache.filter(x => {
    return (x.user.presence.status !== "offline") && !x.voice.channel && x.roles.cache.some(r => cfg.Hammer.BotCommands.includes(r.id)) 
   }).size
 
   msg.channel.send(new MessageEmbed()
   .setDescription(`**${msg.guild.name}** adlı sunucunun detaylı yetkili bilgisi:
   
   \`⦁\` Sunucuda toplam **${yetkili}** yetkili bulunuyor.
   \`⦁\` Sunucuda aktif **${aktif}** yetkili bulunuyor.
   \`⦁\` Sunucuda çevrimdışı **${çevrimdışı}** yetkili bulunuyor.
   \`⦁\` Sunucuda sesli odalarda **${ses}** yetkili bulunuyor.
   \`⦁\` Sunucuda aktif olup seste olmayan **${noVoice}** yetkili bulunuyor.
   
    Sunucudaki yetkili **aktiflik** oranı:
      \`-\` ${progressBar(aktif, yetkili, 8)} / \`%${(aktif / yetkili * 100).toFixed(2)}\`
    
    Sunucudaki yetkili **ses** oranı:
      \`-\` ${progressBar(ses, yetkili, 8)} / \`%${(ses / yetkili * 100).toFixed(2)}\``).setColor(msg.member.displayHexColor).setThumbnail(msg.guild.iconURL({dynamic:true})).setAuthor(msg.guild.name, msg.guild.iconURL({dynamic:true})))
 }}
 
 function progressBar(value, maxValue, size) {
   const progress = Math.round(size * ((value / maxValue) > 1 ? 1 : (value / maxValue)));
   const emptyProgress = size - progress > 0 ? size - progress : 0;
   
   const progressText = "<a:orta:853736428604358696>".repeat(progress);
   const emptyProgressText = "<:ortabos:853737060716118036>".repeat(emptyProgress);
   
   return emptyProgress < 8 ? `<a:start:853736428252430347>${progressText}${emptyProgressText}${emptyProgress === 0 ? `<a:finish:853736428379045948>` : `<:finishbos:853736428106022912>`}` : `<:startbos:853736428071813141>${progressText}${emptyProgressText}<:finishbos:853736428106022912>`;
   }
 