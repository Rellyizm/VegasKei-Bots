module.exports = {
  conf: {
    aliases: ["yetki"],
    name: "koruma",
    usage: 'koruma {aç/kapat}',
    description: 'Sunucunun yetki rollerini açıp kapatırsınız.',
},

 run: async ({client, msg, args, cfg, author, MessageEmbed, prefix}) => {
   
   /*
   Administrator: 8
   Manage Roles: 268435456
   Manage Channels: 16
   Manage Webhooks: 536870912
   Manage Server: 32
   Ban Members: 4
   Kick Members: 2
   */

   if (!["418458203869675529","885590145896689664"].some((ID) => msg.author.id === ID)) return msg.channel.send(`${cfg.Emoji.TickEmoji} Bu komutu sadece belirli kişiler kullanabilir!`)

 //let ManageRolesID = "876117433360994344"

 let ManageRolesID = "966455616023453766" //FÜHRER. 
 let ManageRolesID2 = "966455619425030175"//FOUNDER
 let ManageRolesID3 = "966455621295693854"//OWNER
 let ManageRolesID4 = "912036502844899399"//réwind 

 
 let ChannelsID = "966455616023453766"
 let ChannelsID2 = "966455619425030175"
 let ChannelsID3 = "966455621295693854"
 let ChannelsID4 = "912036502844899399"

 
 let seçenek = args[0]
 if(!seçenek){client.message(client.normalEmbed(`Lütfen tüm argümanları doğru giriniz!\nÖrnek Kullanım: ${prefix}koruma {aç/kapat}`, msg), msg.channel.id)}
 if(seçenek == "Aç"|| seçenek == "aç"|| seçenek == "AÇ"|| seçenek == "ac"|| seçenek == "Ac"|| seçenek == "AC"){
  msg.guild.roles.cache.get(ManageRolesID).setPermissions(0)
  msg.guild.roles.cache.get(ManageRolesID2).setPermissions(0)
  msg.guild.roles.cache.get(ManageRolesID3).setPermissions(0)
  msg.channel.send(`${cfg.Emoji.RedEmoji} Roller başarıyla kapatıldı!`)}
  if(seçenek == "Kapat"|| seçenek == "kapat"|| seçenek == "KAPAT"|| seçenek == "kapa"|| seçenek == "Kapa"){
  msg.guild.roles.cache.get(ChannelsID).setPermissions(948617346775)
  msg.guild.roles.cache.get(ChannelsID2).setPermissions(379533455063)
  msg.guild.roles.cache.get(ChannelsID3).setPermissions(502607555)
  msg.channel.send(`${cfg.Emoji.TickEmoji} Roller başarıyla açıldı!`)}}}
