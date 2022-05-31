const client = global.client;
const moment = require('moment')
const GeneralDatabase = require("../schemas/General");
const cfg = require("../configs/config.json");

module.exports = async (msg) => {
  
      try{if(msg.author.bot) return
      GeneralDatabase.findOne({guildID: msg.guild.id, userID: msg.author.id}, async (err, res) => {
      if (res) {
       let afkveri = res.afk || {};
       if (afkveri.mod) {
        res.afk = {};
        res.save();
      msg.member.setNickname(msg.member.displayName.replace("[AFK]", "")).catch(() => { });
      client.message(client.normalEmbed(`${msg.author} AFK modundan başarıyla çıkış yaptın, ${moment(afkveri.date).locale("TR").fromNow()} AFK olmuştun.`, msg), msg.channel.id, 7000)} else { };} else { };})

      let uye = msg.guild.member(msg.mentions.users.first());
      if(uye) {
      if ((uye.id !== msg.author.id) && (!client.afklar.has(uye.id))) {
      GeneralDatabase.findOne({guildID: msg.guild.id, userID: uye.id}, async (err, res) => {
       if (res) {
        let afkveri = res.afk || {};
        if (afkveri.mod) {
        let reason = afkveri.reason;
        await client.afklar.add(uye.id);
        setTimeout(() => client.afklar.delete(uye.id), client.getDate(5, "saniye"));
      client.message(client.normalEmbed(`Etiketlediğiniz kullanıcı ${moment(afkveri.date).locale("TR").fromNow()} AFK moduna geçti. Sebep: ${reason}`, msg), msg.channel.id, 7000)} else { };} else { };})}}
}catch{{}}
}

module.exports.conf = {
  name: "message",
};
