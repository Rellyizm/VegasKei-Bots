const cfg = require("../configs/config.json");
const fs = require("fs");
const moment = require("moment");
const ms = require("ms");
const {MessageEmbed} = require("discord.js");
const Discord = require("discord.js");
const MessageAttachment = require("discord.js");
const client = global.client;
let sended = false;
const inviterData = require("../schemas/inviter");
const inviteMemberData = require("../schemas/inviteMember");
const GeneralDatabase = require("../schemas/General");
const CezaDatabase = require("../schemas/Ceza");
const CezapuanDatabase = require("../schemas/Cezapuanı");
const CezaSayıDatabase = require("../schemas/CezaSayı")
const StaffDatabase = require("../schemas/Yetkili");
const ControlsDatabase = require("../schemas/Controls");
const RegisterDatabase = require("../schemas/Register");
const TagAldıDatabase = require("../schemas/TagAldı");
const MsgDeleteDatabase = require("../schemas/MessageDelete");
const VoiceMuteDatabase = require("../schemas/VoiceMute");
const VoiceUnmuteDatabase = require("../schemas/VoiceUnmute");
const CezalıRolesDatabase = require("../schemas/Cezalı");
const CezaExtraRolesDatabase = require("../schemas/ExtraCeza");
const AlarmDatabase = require("../schemas/Alarm");
const AçılmazBanDatabase = require("../schemas/AçılmazBan");
const NotDatabase = require("../schemas/Not");
const YetkiliKayıtDatabase = require("../schemas/YetkiliKayıt");
const Puan = require("../schemas/Puan");
const VoiceJoinedDateDatabase = require("../schemas/VoiceJoined.js")
const CoinDatabase = require("../schemas/Coin.js")
const görevDatabase = require("../schemas/Görev.js")

module.exports = async (msg) => {
  let prefix = cfg.Bot.Prefix.find((x) => msg.content.toLowerCase().startsWith(x));
  if (msg.author.bot || !msg.guild || !prefix) return;
  let args = msg.content.substring(prefix.length).trim().split(" ");
  let commandName = args[0].toLowerCase();
  const guild = msg.guild.id
  args = args.splice(1);
  let cmd = client.commands.has(commandName) ? client.commands.get(commandName) : client.commands.get(client.aliases.get(commandName));
  let Command = cfg.Roles.PermCommands.find((perm) => perm.Usages.includes(commandName));
  if (Command) {
   if (!msg.member.roles.cache.some(r => cfg.Hammer.Other.includes(r.id)) && !msg.member.roles.cache.some(r => Command.UsePeople.includes(r.id)) && !msg.member.hasPermission(8)) return client.timemessage(client.yetersizYetki(msg, msg), msg.channel.id, 5000) 
    const Member = msg.mentions.members.first() || msg.guild.members.cache.get(args[0]);
   if (!Member) return client.timemessage(client.normalEmbed(`Lütfen bir üyeyi etiketle ve tekrar dene!`, msg), msg.channel.id, 5000)
    const Roles = Command.Roles;
     client.message(client.normalEmbed(`${Roles.some(role => Member.roles.cache.has(role)) ? `${Member} kişisinden ${Roles.map(role => `<@&${role}>`).join(",")} ${Roles.length > 1 ? "rolleri" : "rolü"} alındı.` : `${Member} kişisine ${Roles.map(role => `<@&${role}>`).join(",")} ${Roles.length > 1 ? "rolleri" : "rolü"} verildi.`}`, msg), msg.channel.id)
     client.react(msg, "tick")
   if (Roles.some(role => Member.roles.cache.has(role))) Member.roles.remove(Roles);
     else Member.roles.add(Roles);
  }
  if (cmd) {
   let author = msg.guild.member(msg.author);
   let uye = msg.guild.member(msg.mentions.users.first()) || msg.guild.members.cache.get(args[0]);
   let uyekontrol = `${msg.guild.member(uye) ? "True" : "False"}`
   if (cmd.conf.owner && !cfg.Bot.Owners.includes(msg.author.id)) return;
   if (cmd.conf.serverowner && !msg.guild.owner.user.id.includes(msg.author.id) && !cfg.Bot.Owners.includes(msg.author.id)) return;
   cmd.run({client: client, msg: msg, args: args, prefix: prefix, guild: guild, görevDatabase: görevDatabase, CoinDatabase: CoinDatabase, author: author, uye: uye, VoiceJoinedDateDatabase: VoiceJoinedDateDatabase,  Puan: Puan, YetkiliKayıtDatabase: YetkiliKayıtDatabase, NotDatabase: NotDatabase, AçılmazBanDatabase: AçılmazBanDatabase, AlarmDatabase: AlarmDatabase, CezaExtraRolesDatabase: CezaExtraRolesDatabase, CezalıRolesDatabase: CezalıRolesDatabase, VoiceUnmuteDatabase: VoiceUnmuteDatabase, VoiceMuteDatabase: VoiceMuteDatabase, MsgDeleteDatabase: MsgDeleteDatabase, TagAldıDatabase: TagAldıDatabase, RegisterDatabase: RegisterDatabase, ControlsDatabase: ControlsDatabase, StaffDatabase: StaffDatabase, CezaSayıDatabase: CezaSayıDatabase, CezapuanDatabase: CezapuanDatabase, CezaDatabase: CezaDatabase, GeneralDatabase: GeneralDatabase, cfg: cfg, fs: fs, MessageEmbed: MessageEmbed, inviterData: inviterData, inviteMemberData: inviteMemberData, Discord: Discord, moment: moment, uyekontrol: uyekontrol, MessageAttachment: MessageAttachment, ms: ms});}}

module.exports.conf = {
  name: "message",
};
