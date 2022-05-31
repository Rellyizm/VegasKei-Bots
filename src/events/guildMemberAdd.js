const {MessageEmbed}= require("discord.js");
const cfg = require("../configs/config.json");
const CezaDatabase = require("../schemas/Ceza");
const CezaSayıDatabase = require("../schemas/CezaSayı");
const client = global.client;
const ControlsDatabase = require("../schemas/Controls");
const CezaExtraRolesDatabase = require("../schemas/ExtraCeza");

module.exports = async(member) => {
  
  let CezaData = await CezaDatabase.findOne({ guildID: cfg.Server.GuildID, userID: member.id, chatmuted: true}) 
  if(CezaData && CezaData.chatmuted === true) {
  await member.roles.add(cfg.Roles.Muted).catch(() => { })
  CezaData.chatmuted = false
  CezaData.save()}
   
  let CezaDataa = await CezaDatabase.findOne({ guildID: cfg.Server.GuildID, userID: member.id, voicemuted: true}) 
  if((CezaDataa && CezaDataa.voicemuted === true) && member.voice.channel) {
  member.voice.setMute(true).catch(() => { })
  CezaDataa.voicemuted = false
  CezaDataa.save()}
  
  const JailData = await CezaDatabase.findOne({ guildID: member.guild.id, userID: member.id, jail: true})
  if(JailData && JailData.jail === true) {
  member.roles.cache.has(cfg.Roles.BoosterRolü) ?  member.roles.set([cfg.Roles.BoosterRolü, cfg.Roles.CezalıRolü]) : member.roles.set([cfg.Roles.CezalıRolü])
  let CezaDatax2 = await CezaDatabase.findOne({ guildID: cfg.Server.GuildID, userID: member.id, jail: true}) 
  CezaDatax2.jail = false
  CezaDatax2.save()}

  const JailDatax2 = await CezaDatabase.findOne({ guildID: member.guild.id, userID: member.id, jail3days: true})
  if(JailDatax2 && JailDatax2.jail3days === true) {
  member.roles.cache.has(cfg.Roles.BoosterRolü) ?  member.roles.set([cfg.Roles.BoosterRolü, cfg.Roles.CezalıRolü]) : member.roles.set([cfg.Roles.CezalıRolü])
  let RolesData = await CezaExtraRolesDatabase.findOne({ guildID: cfg.Server.GuildID, userID: member.id})
  if(RolesData) {RolesData.delete()}
  let CezaDatax2 = await CezaDatabase.findOne({ guildID: cfg.Server.GuildID, userID: member.id, jail3days: true}) 
  CezaDatax2.jail3days = false
  CezaDatax2.save()}
  
  let YasaklıTagData = await ControlsDatabase.findOne({ guildID: cfg.Server.GuildID})
  let yasakTaglar = YasaklıTagData && YasaklıTagData.yasaklıtag;
  if(YasaklıTagData && yasakTaglar.some(tag => member.user.tag.includes(tag))) {
  member.roles.set([cfg.Roles.YasaklıTagRolü])
  client.channels.cache.get(cfg.Channels.YasaklıTag).send(new MessageEmbed().setAuthor(member.guild.name, member.guild.iconURL({dynamic: true})).setColor(client.vegasRenkler[Math.floor(Math.random() * client.vegasRenkler.length)]).setDescription(`${member} üyesi sunucuya katıldı fakat sunucumuzun yasaklı taglar listesinde bulunan bir tagı isminde bulundurduğu için cezalıya atmak zorunda kaldım.`));
  member.send(new MessageEmbed().setAuthor(member.guild.name, member.guild.iconURL({dynamic: true})).setColor(client.vegasRenkler[Math.floor(Math.random() * client.vegasRenkler.length)]).setDescription(`Öncelikle sunucumuza hoşgeldin;\n Sunucumuzun **yasaklı taglar** listesinde bulunan bir **tagı** ismine almışsın bu yüzden seni cezalıya atmak zorunda kaldım. Bu **tagı** isminden çıkararak cezalıdan çıkabilirsin.`)).catch(() => { });}


  if (vegas.user.username.toLowerCase().includes("Salvatore","slvtr") || vegas.user.discriminator === "1453") {
  member.roles.add([cfg.Tag.TagRolü])
  client.channels.cache.get(cfg.Channels.TagLog).send(new MessageEmbed().setAuthor(member.guild.name, member.guild.iconURL({dynamic: true})).setColor(client.vegasRenkler[Math.floor(Math.random() * client.vegasRenkler.length)]).setDescription(`${member} adlı üye sunucumuza taglı olarak giriş yaptı ve rolünü verdim.`));
}

module.exports.conf = {
  name: "guildMemberAdd",
}};
