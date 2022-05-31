module.exports = {
  conf: {
    aliases: ["av","pp","resim"],
    name: "avatar",
    usage: 'avatar [üye]',
    description: 'Belirttiğiniz kullanıcının avatarını görüntülersiniz. (Sunucuda Olmayan Birinin Avatarına da Bakabilirsiniz.)',
  },
 run: async ({client, msg, args, cfg, author, Discord}) => {
   
 let member = msg.mentions.members.first() || args[0] || author
 let victim;
 if(member instanceof Discord.GuildMember) { victim = member.user; }else if(member instanceof Discord.User) { victim = member; }else { victim = await client.users.fetch(member) } 
 msg.channel.send(`${victim.tag.replace("`","")} ${victim.avatarURL({ dynamic: true })}`)}}