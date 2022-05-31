module.exports = {
  conf: {
    aliases: ["notbırak","not-bırak"],
    name: "not",
    usage: 'not [üye] [not]',
    description: 'Belirttiğiniz üyeye not bırakırsınız.',
  },

 run: async ({client, msg, args, cfg, author, uye, NotDatabase}) => {
   
     if (!msg.member.roles.cache.some(r => cfg.Hammer.Other.includes(r.id)) && !msg.member.roles.cache.some(r => cfg.Hammer.BotCommands.includes(r.id)) && !msg.member.hasPermission(8)) return client.message(client.yetersizYetki(msg, msg), msg.channel.id, 5000)
     if (!uye) return client.timemessage(client.normalEmbed("Not bırakmak istediğin kullanıcıyı düzgünce belirt ve tekrar dene !", msg,), msg.channel.id, 7000)
     await NotDatabase.findOne({ user: uye.id }, async (err, res) => {
     if (!args.slice(1).join(" ")) return client.timemessage(client.normalEmbed("Kişiye bırakmak istediğin notu yaz ve tekrar dene !", msg,), msg.channel.id, 7000)
     if (!res) {
     let arr = []
     arr.push({ not: args.slice(1).join(" "), yetkili: msg.author.id })
     const newData = new NotDatabase({
      user: uye.id,
      notlar: arr})
     newData.save().catch(e => console.log(e))
     client.message(client.normalEmbed(`<@${uye.id}> kişisine başarıyla not bırakıldı.

     :no_entry_sign: | "${args.slice(1).join(" ")}"`, msg,), msg.channel.id)} else {
      res.notlar.push({ not: args.slice(1).join(" "), yetkili: msg.author.id })
      res.save().catch(e => console.log(e))
     client.message(client.normalEmbed(`<@${uye.id}> kişisine başarıyla not bırakıldı.

     :no_entry_sign: | "${args.slice(1).join(" ")}"`, msg,), msg.channel.id)}})}}