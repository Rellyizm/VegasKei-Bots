module.exports = {
  conf: {
    aliases: ["kanalkilit","kanalkitle"],
    name: "kilit",
    usage: 'kilit',
    description: 'Komutu kullandığınız kanalı kullanıma kapatır.',
},

 run: async ({client, msg, args, cfg, author, MessageEmbed, StaffDatabase}) => {
   
    if (!msg.member.roles.cache.some(r => cfg.Hammer.Other.includes(r.id)) && !msg.member.hasPermission(8)) return client.timemessage(client.yetersizYetki(msg, msg), msg.channel.id, 5000)
    if (!client.locked[msg.channel.id]) client.locked[msg.channel.id] = { lock: false };
    if (client.locked[msg.channel.id].lock === false) {
    client.message(client.normalEmbed("**Kanal başarıyla kilitlendi.**", msg), msg.channel.id);
    msg.channel.updateOverwrite(msg.guild.roles.everyone, {  
     SEND_MESSAGES: false}) 
    client.locked[msg.channel.id].lock = true;} else {
    client.message(client.normalEmbed("**Kanalın kilidi başarıyla açıldı.**", msg), msg.channel.id);
    msg.channel.updateOverwrite(msg.guild.roles.everyone, {
     SEND_MESSAGES: null})
    client.locked[msg.channel.id].lock = false;}}}
