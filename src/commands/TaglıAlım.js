module.exports = {
  conf: {
    aliases: ["taglialim"],
    name: "taglıalım",
    usage: 'taglıalım [aç/kapat]',
    description: 'Taglı alım modunun açıp kapatırsınız.',
  },
 run: async ({client, msg, args, cfg, author, Discord, prefix, guild, ControlsDatabase}) => {
   
   if (!msg.member.roles.cache.some(r => cfg.Hammer.Other.includes(r.id)) && !msg.member.hasPermission(8)) return client.timemessage(client.yetersizYetki(msg, msg), msg.channel.id, 5000)     
   let seçenek = args[0]
   let taglıalımData = await ControlsDatabase.findOne({ guildID: msg.guild.id})
   let denetlenecek = ["aç","ac","open","kapat","kapat","off","kapalı","Ac","Aç","Open","açık","AÇ","KAPA","Kapat","KAPAT","AÇIK","Açık","Kapalı"]
   if(!denetlenecek.some(x => seçenek === x)) return client.timemessage(client.normalEmbed(`Lütfen tüm argümanları doğru giriniz!\nÖrnek Kullanım: ${prefix}taglıalım {aç/kapat}`, msg), msg.channel.id, 5000)
   if(!seçenek){client.timemessage(client.normalEmbed(`Lütfen tüm argümanları doğru giriniz!\nÖrnek Kullanım: ${prefix}taglıalım {aç/kapat}`, msg), msg.channel.id, 5000)}
   if(seçenek == "aç"|| seçenek == "ac"|| seçenek == "AÇ"|| seçenek == "Aç"|| seçenek == "Ac"|| seçenek == "AC"|| seçenek == "open"|| seçenek == "Open"|| seçenek == "Açıık"|| seçenek == "açık"){
   if(taglıalımData && taglıalımData.taglıalım === "Açık") return client.timemessage(client.normalEmbed(`Taglı alım modu zaten aktif halde.`, msg), msg.channel.id, 5000)
   await ControlsDatabase.findOneAndUpdate({ guildID: msg.guild.id}, { $set: { taglıalım: "Açık" } }, { upsert: true }) 
   client.message(client.normalEmbed(`Başarıyla \`Taglı Alım\` modunu aktif hala getirdiniz.`, msg), msg.channel.id)}
   if(seçenek == "kapa"|| seçenek == "kapat"|| seçenek == "kapalı"|| seçenek == "off"|| seçenek == "Kapa"|| seçenek == "Kapat"|| seçenek == "Kapalı"|| seçenek == "KAPAT"|| seçenek == "KAPA"|| seçenek == "KAPALI"){
   if(taglıalımData && taglıalımData.taglıalım === "Kapalı") return client.timemessage(client.normalEmbed(`Taglı alım modu zaten inaktif halde.`, msg), msg.channel.id, 5000)  
   await ControlsDatabase.findOneAndUpdate({ guildID: msg.guild.id}, { $set: { taglıalım: "Kapalı" } }, { upsert: true })   
   client.message(client.normalEmbed(`Başarıyla \`Taglı Alım\` modunu inaktif hala getirdiniz.`, msg), msg.channel.id)}}}
