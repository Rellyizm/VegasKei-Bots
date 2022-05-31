module.exports = {
  conf: {
    aliases: ["temizle"],
    name: "sil",
    usage: 'sil [sayı]',
    description: 'Komutu kullandığını kanalda belirttiğiniz kadar mesaj siler.',
},

 run: async ({client, msg, args, cfg, author, MessageEmbed, uye}) => {
   
  if (!msg.member.roles.cache.some(r => cfg.Hammer.Other.includes(r.id)) && !msg.member.hasPermission(8)) return client.timemessage(client.yetersizYetki(msg, msg), msg.channel.id, 5000)                              
        let amount = args[0];
        if (!amount || isNaN(amount) || parseInt(amount) < 1) {
            return client.timemessage(client.normalEmbed("Silinecek mesaj sayısını belirtmelisin.", msg), msg.channel.id, 7000)
        }        await msg.delete();
        const user = msg.mentions.users.first();

        let messages = await msg.channel.messages.fetch({ limit: 100 });
        messages = messages.array();
        if (user) {
            messages = messages.filter((m) => m.author.id === user.id);
        }
        if (messages.length > amount) {
            messages.length = parseInt(amount, 10);
        }
        messages = messages.filter((m) => !m.pinned);
        amount++;
        msg.channel.bulkDelete(messages, true);
        if (user) {
            client.timemessage(client.normalEmbed(`${user} kişisinin **${messages.length}** mesajı sildi.`, msg), msg.channel.id, 7000)
        } else {
            client.timemessage(client.normalEmbed(`**${messages.length}** mesaj silindi.`, msg), msg.channel.id, 7000)
        }
  client.channels.cache.get(cfg.Channels.Log).send(new MessageEmbed().setDescription(`${msg.author}, <#${msg.channel.id}> kanalında **${messages.length}** mesaj sildi!`).setTitle(`**Sohbet Temizlendi!**`).setTimestamp().setColor(client.vegasRenkler[Math.floor(Math.random() * client.vegasRenkler.length)]))}}