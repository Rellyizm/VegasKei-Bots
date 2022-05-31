const fetch = require('node-fetch')

module.exports = {
  conf: {
    aliases: ["oyun"],
    name: "game",
    usage: 'game [tür]',
    description: 'Bulunduğunuz ses kanalında oyun açarsınız.',
  },

 run: async ({client, msg, args, cfg, author, GeneralDatabase}) => {
   
 if (!msg.member.roles.cache.some(r => cfg.Hammer.Other.includes(r.id)) && !msg.member.roles.cache.has(cfg.Tag.TagRolü) && !msg.member.hasPermission(8)) return client.timemessage(client.normalEmbed(`Bu özellik sadece taglı üyelerimiz içindir. Tag alıp kullanabilirsin.`, msg), msg.channel.id, 5000) 

   if(!msg.member.voice.channel) return client.message(client.normalEmbed(`Lütfen bir ses kanalına gir ve tekrardan dene!`, msg), msg.channel.id)
if(!args[0]) return client.message(client.normalEmbed(`Lütfen geçerli bir tür belirtiniz.\n\n\`•\` Youtube: yt\n\`•\` Betrayal.io: bio\n\`•\` Poker Night: pn\n\`•\` Fishington.io: fio`, msg), msg.channel.id)
if(args[0] == 'yt' || args[0] == 'youtube' || args[0] == 'Youtube') {
fetch(`https://discord.com/api/v8/channels/${msg.member.voice.channel.id}/invites`, {
                    method: "POST",
                    body: JSON.stringify({
                        max_age: 86400,
                        max_uses: 0,
                        target_application_id: "755600276941176913",
                        target_type: 2,
                        temporary: false,
                        validate: null
                    }),
                    headers: {
                        "Authorization": `Bot ${client.token}`,
                        "Content-Type": "application/json"
                    }
                })
                .then(res => res.json())
                .then(invite => {
                   msg.channel.send(`Youtube'a \`${msg.member.voice.channel.name}\` kanalında bağlanmak için linke tıklayabilirsin!\n https://discord.gg/${invite.code}`)
                })
} else if(args[0] == 'bio' || args[0] == 'Betrayal.io' || args[0] == 'betrayal.io') {
fetch(`https://discord.com/api/v8/channels/${msg.member.voice.channel.id}/invites`, {
                  method: "POST",
                    body: JSON.stringify({
                        max_age: 86400,
                        max_uses: 0,
                       target_application_id: "773336526917861400",
                        target_type: 2,
                        temporary: false,
                        validate: null
                    }),
                    headers: {
                        "Authorization": `Bot ${client.token}`,
                        "Content-Type": "application/json"
                    }
                })
                .then(res => res.json())
                .then(invite => {
                   msg.channel.send(`Betrayal.io'ya \`${msg.member.voice.channel.name}\` kanalında bağlanmak için linke tıklayabilirsin!\n https://discord.gg/${invite.code}`)
                })
} else if(args[0] == 'pn' || args[0] == 'Poker Night') {
fetch(`https://discord.com/api/v8/channels/${msg.member.voice.channel.id}/invites`, {
                  method: "POST",
                    body: JSON.stringify({
                        max_age: 86400,
                        max_uses: 0,
                        target_application_id: "755827207812677713",
                        target_type: 2,
                        temporary: false,
                        validate: null
                    }),
                    headers: {
                        "Authorization": `Bot ${client.token}`,
                        "Content-Type": "application/json"
                    }
                })
                .then(res => res.json())
                .then(invite => {
                    msg.channel.send(`Poker Night'a \`${msg.member.voice.channel.name}\` kanalında bağlanmak için linke tıklayabilirsin!\n https://discord.gg/${invite.code}`)
                })
} else if(args[0] == 'fio' || args[0] == 'Fishington.io') {
fetch(`https://discord.com/api/v8/channels/${msg.member.voice.channel.id}/invites`, {
             method: "POST",
                    body: JSON.stringify({
                        max_age: 86400,
                        max_uses: 0,
                        target_application_id: "814288819477020702",
                        target_type: 2,
                        temporary: false,
                        validate: null
                    }),
                    headers: {
                        "Authorization": `Bot ${client.token}`,
                        "Content-Type": "application/json"
                    }
                })
                .then(res => res.json())
                .then(invite => {
                    msg.channel.send(`Fishington.io'ya \`${msg.member.voice.channel.name}\` kanalında bağlanmak için linke tıklayabilirsin!\n https://discord.gg/${invite.code}`)
                })
} else {
 client.message(client.normalEmbed(`Lütfen geçerli bir tür belirtiniz.\n\n\`•\` Youtube: yt\n\`•\` Betrayal.io: bio\n\`•\` Poker Night: pn\n\`•\` Fishington.io: fio`, msg), msg.channel.id)}}}