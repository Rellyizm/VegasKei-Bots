const {MessageEmbed}= require("discord.js");
const client = global.client;
const cfg = require("../configs/config.json");
const CezaSayıDatabase = require("../schemas/CezaSayı");
const CezaDatabase = require("../schemas/Ceza");
const CezalıRolesDatabase = require("../schemas/Cezalı");
const CezaExtraRolesDatabase = require("../schemas/ExtraCeza");

module.exports = async() => {
  
  setInterval(async() => {
  CezaDatabase.find({jail: true, Type: "Jail"}, async(err, jailData) => {
  if ((!jailData) || (jailData.length < 1)) return null;
   for (var jailler of jailData) {
  let uye = client.guilds.cache.get(cfg.Server.GuildID).members.cache.get(jailler.userID);
  if (Date.now() >= jailler.finishDate) { 
  jailler.jail = false
  jailler.save()
  let RolesData = await CezalıRolesDatabase.findOne({ guildID: cfg.Server.GuildID, userID: uye.id})
  if (uye && uye.roles.cache.has(cfg.Roles.CezalıRolü)) {
  if(RolesData && RolesData.roles) {
  uye.roles.remove(cfg.Roles.CezalıRolü)
  uye.roles.add(RolesData.roles)
  RolesData.delete()
  }else{client.setRoles(uye.id, cfg.Roles.KayıtsızRolü)}}
  } else {if (uye && !uye.roles.cache.has(cfg.Roles.CezalıRolü)) uye.roles.cache.has(cfg.Roles.BoosterRolü) ?  uye.roles.set([cfg.Roles.BoosterRolü, cfg.Roles.CezalıRolü]) : uye.roles.set([cfg.Roles.CezalıRolü])}}})}, 5000);
  
  setInterval(async() => {
  let tarih = Date.now()
  CezaDatabase.find({jail3days: true, Type: "Jail"}, async(err, jailData) => {
  if ((!jailData) || (jailData.length < 1)) return null;
  for (var jailler of jailData) {
  let uye = client.guilds.cache.get(cfg.Server.GuildID).members.cache.get(jailler.userID);
  if (Date.now() >= jailler.finishDate) { 
  jailler.jail3days = false
  jailler.save()
  let RolesData = await CezaExtraRolesDatabase.findOne({ guildID: cfg.Server.GuildID, userID: uye.id})
  if (uye && uye.roles.cache.has(cfg.Roles.CezalıRolü)) {
  if(RolesData && RolesData.roles) {
  uye.roles.remove(cfg.Roles.CezalıRolü)
  uye.roles.add(RolesData.roles)
  RolesData.delete()
  }else{client.setRoles(uye.id, cfg.Roles.KayıtsızRolü)} }
  } else {if (uye && !uye.roles.cache.has(cfg.Roles.CezalıRolü)) uye.roles.cache.has(cfg.Roles.BoosterRolü) ?  uye.roles.set([cfg.Roles.BoosterRolü, cfg.Roles.CezalıRolü]) : uye.roles.set([cfg.Roles.CezalıRolü])}}})}, 5000);

}
module.exports.conf = {
  name: "ready",
};
