module.exports = {
  conf: {
    aliases: ["kayıtb","kayıtinfo"],
    name: "kayıtbilgi",
    usage: 'kayıtbilgi [üye]',
    description: 'Belirttiğiniz kullanıcının kayıt verilerine bakarsınız.',
},

 run: async ({client, msg, args, cfg, author, MessageEmbed, StaffDatabase}) => {
   
  if (!msg.member.roles.cache.some(r => cfg.Hammer.Other.includes(r.id)) && !msg.member.roles.cache.some(r => cfg.Hammer.BotCommands.includes(r.id)) && !msg.member.hasPermission(8)) return client.timemessage(client.yetersizYetki(msg, msg), msg.channel.id, 5000)
  let member = msg.mentions.users.first() || msg.guild.members.cache.get(args[0]) || msg.author;
  const registerData = await StaffDatabase.findOne({ guildID: msg.guild.id, userID: member.id});
  let kız = registerData && registerData.kızkayıt ? registerData.kızkayıt : 0
  let erkek = registerData && registerData.erkekkayıt ? registerData.erkekkayıt : 0
  let fakekayıt = registerData && registerData.fakekayıt ? registerData.fakekayıt : 0
  let toplam = kız+erkek+fakekayıt
  if(toplam === 0) return client.message(client.normalEmbed(`${member} kişisinin hiç kayıt bilgisi yok.`, msg), msg.channel.id)
  if(registerData && registerData.kayıtlar) {
  let üyeler = client.shuffle(registerData && registerData.kayıtlar.map(x => "<@" + x + ">"))
  if (üyeler.length > 10) üyeler.length = 10
  client.message(client.normalEmbed(`${member} kişisi ${erkek} erkek, ${kız} kız kaydetmiş. (${toplam} toplam) (${fakekayıt} fake)\nKaydettiği bazı kişiler: ${üyeler.join(",")}`, msg), msg.channel.id)    
  return}
  client.message(client.normalEmbed(`${member} kişisi ${erkek} erkek, ${kız} kız kaydetmiş.`, msg), msg.channel.id)
  client.react(msg, "tick")}}