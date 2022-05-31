module.exports = {
  conf: {
    aliases: ["yoklama","katıldı"],
    name: "toplantı",
    usage: 'toplantı çek/dağıt/al',
    description: 'Toplantı kanalına seste bulunan yetkilileri çeker./Toplantı kanalında ki yetkililere katıldı rolünü verir./Tüm yetkililerden katıldı rolünü alır.'   
  },

 run: async ({client, msg, args, cfg, author, prefix}) => {

  const evet = "✅";
  const hayir = "❌";
  if (!msg.member.roles.cache.some(r => cfg.Hammer.Other.includes(r.id)) && !msg.member.hasPermission(8)) return client.timemessage(client.yetersizYetki(msg, msg), msg.channel.id, 5000)
  if (!author.voice.channel) return client.timemessage(client.normalEmbed("Bu komutu kullanmak için bir sesli kanalda olman gerek.", msg), msg.channel.id, 5000);
  let tip = args[0];
  var yetkililer = msg.guild.members.cache.filter(y => y.roles.cache.some(r => cfg.Roles.YetkiliRolleri.includes(r.id)));
  if (tip === "çek") {var kanal = author.voice.channelID;
  var ytler = yetkililer.filter(yetkili => yetkili.voice.channel && msg.guild.members.cache.get(yetkili.id).voice.channel.id !== author.voice.channel.id);
  if (ytler.size === 0) return client.timemessage(client.normalEmbed("Seste çekilecek yetkili bulunmuyor.", msg), msg.channel.id, 5000);
  await client.message(client.normalEmbed(`\`${ytler.size}\` üye kanala çekiliyor.`, msg), msg.channel.id);
  ytler.map(user => user.voice.setChannel(kanal));} else if (tip === "katıldı") {let tip2 = args[1];
  if (["dağıt", "ver"].includes(tip2)) {
  function onlarFilterBenVegas(r, u) { return [evet, hayir].includes(r.emoji.name) && u.id === author.id };
  var katildi = msg.guild.roles.cache.get(args[2]) || msg.mentions.roles.first();
  if (!katildi) return client.timemessage(client.normalEmbed(`Komut kullanımı: \`${prefix}toplantı katıldı (dağıt/ver) (<@rol>/rolid)\``, msg), msg.channel.id, 5000);
  var ytler = yetkililer.filter(yetkili => yetkili.voice.channel && !yetkili.bot && msg.guild.members.cache.get(yetkili.id).voice.channel.id === author.voice.channel.id && !yetkili.roles.cache.get(katildi.id));
  if (ytler.size === 0) return client.timemessage(client.normalEmbed("Seste yetki verilecek yetkili bulunmuyor.", msg), msg.channel.id, 5000);
  msg.channel.send({embed:{description:` \`${author.voice.channel.name}\` adlı kanaldaki herkese katıldı permini vermek istiyor musun?`, color: client.vegasRenkler[Math.floor(Math.random() * client.vegasRenkler.length)], timestamp: new Date()}}).then(async msj => {
  await msj.react(evet);
  await msj.react(hayir);
  msj.awaitReactions(onlarFilterBenVegas, { max: 1, time: client.getDate(15, "saniye"), errors:["time"]}).then(async collected => {
  let cvp = collected.first();
  if (cvp.emoji.name === evet) {
  await msj.delete();
  await msg.delete();
  await msg.channel.send(client.normalEmbed(`**Başarıyla \`${ytler.size}\` kişiye katıldı permi dağıtıyorum.**`, msg)).catch(() => {});
  ytler.map(y => y.roles.add(katildi.id));} else {
  await msj.delete().catch(() => { })
  await msg.delete().catch(() => { })
  client.timemessage(client.normalEmbed(`Komut başarıyla iptal edildi.`, msg), msg.channel.id, 5000);};}).catch(() => [msj.delete(), msg.delete()]);;});} else if (["al", "topla"].includes(tip2)) {
  function onlarFilterBenVegas(r, u) { return [evet, hayir].includes(r.emoji.name) && u.id === author.id };
  var katildi = msg.guild.roles.cache.get(args[2]) || msg.mentions.roles.first();
  if (!katildi) return client.message(client.normalEmbed(`Komut kullanımı: \`${prefix}toplantı katıldı (al/topla) (<@rol>/rolid)\``, msg), msg.channel.id, 5000);
  var ytler = msg.guild.members.cache.filter(u => u.roles.cache.get(katildi.id));
  if (ytler.size === 0) return client.message(client.normalEmbed("**Katıldı rolüne sahip üye bulunmuyor..**", msg), msg.channel.id, 5000);
  msg.channel.send({embed:{description:`Katıldı permine sahip tüm üyelerden  katıldı permini almak istiyor musun?`, color: client.vegasRenkler[Math.floor(Math.random() * client.vegasRenkler.length)]}}).then(async msj => {
  await msj.react(evet);
  await msj.react(hayir);
  msj.awaitReactions(onlarFilterBenVegas, { max: 1, time: client.getDate(15, "saniye"), errors:["time"]}).then(async collected => {
  let cvp = collected.first();
  if (cvp.emoji.name === evet) {
  await msj.delete();
  await msg.delete();
  await msg.channel.send(client.normalEmbed(`**Başarıyla \`${ytler.size}\` kişiden katıldı permini alıyorum.**`, msg)).catch(() => {});
  ytler.map(y => y.roles.remove(katildi.id));} else {await msj.delete().catch(() => { })
  await msg.delete().catch(() => { })
  client.timemessage(client.normalEmbed(`Komut başarıyla iptal edildi.`, msg), msg.channel.id, 5000);};}).catch(() => [msj.delete(), msg.delete()]);;});};} else return client.timemessage(client.normalEmbed(`Komut kullanımı yanlış.\n\n\`•\` ${prefix}toplantı çek\n\`•\` ${prefix}toplantı katıldı (dağıt/ver) (<@rol>/rolid)\n\`•\` ${prefix}toplantı katıldı (al/topla) (<@rol>/rolid)`, msg), msg.channel.id, 5000);}}
