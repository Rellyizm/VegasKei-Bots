module.exports = {
  conf: {
    aliases: ["ttaşı"],
    name: "toplutaşı",
    usage: 'toplutaşı [ID]',
    description: 'Bulunduğunuz kanaldaki üyeleri belirttiğiniz kanala taşırsınız.',
 },

 run: async ({client, msg, args, cfg, author, guild, banlog, MessageEmbed, ControlsDatabase, BanInfoDatabase}) => {
   
        if (!msg.member.roles.cache.some(r => cfg.Hammer.Other.includes(r.id)) && !msg.member.hasPermission(8)) return
        if (!msg.member.voice.channel) return client.timemessage(client.normalEmbed("Toplu taşıma işlemi uygulamadan önce bir ses kanalına bağlı olmalısın !", msg), msg.channel.id, 7000)
        let channel = args[0]
        if (args.length < 1) return client.timemessage(client.normalEmbed("Kanalındaki üyeleri taşımak istediğin kanal IDsini belirt ve tekrar dene.", msg), msg.channel.id, 7000)
        let positionChannel = msg.guild.channels.cache.find(x => x.id == channel)
        if (!positionChannel) return client.timemessage(client.normalEmbed("Belirttiğin kanal IDsi geçerli değil.", msg), msg.channel.id, 7000)
        let channelMembers = msg.member.voice.channel.members.map(x => x.id)
        for (let i = 0; i < channelMembers.length; i++) {
            setTimeout(() => {
                msg.guild.members.cache.get(channelMembers[i]).voice.setChannel(positionChannel.id)
            }, (i + 1) * 1000)
        }
        client.message(client.normalEmbed(`${msg.member.voice.channel} kanalındaki üyeler ${positionChannel} kanalına taşındı`, msg), msg.channel.id)}}
