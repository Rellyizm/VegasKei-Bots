module.exports = {
  conf: {
    aliases: ["ytag"],
    name: "yasaklıtag",
    usage: 'yasaklıtag [tag]',
    description: 'Belirttiğiniz tagı yasaklıya alırsınız. (Sunucuda Bu Tagda Bulunan Herkesi Cezalıya Atar, Sunucuya Katılan Bu Taga Sahip Kişileri Cezalıya Atar, Yasaklı Tagı Kaldırırsanızda O Taga Sahip Kişileri Cezalıdan Çıkarır (!yasaklıtag sil [tag]), Yasaklı Tagları Görmek İçin İse (!yasaklıtag liste)) )',
},

 run: async ({client, msg, args, cfg, author, uye, prefix, guild, MessageEmbed, ControlsDatabase}) => {
   
  if (!msg.member.roles.cache.some(r => cfg.Hammer.Other.includes(r.id)) && !msg.member.roles.cache.some(r => cfg.Hammer.Other.includes(r.id))) return msg.channel.send("BU KOMUTU KULLANABİLMEK İCİN ÖNCE JUQESTE BİAD ETMEN GEREKİYOR") 
  let sorgu = args[0]
  if(sorgu == "yardım" || sorgu == "yardim" || sorgu == "help" || !sorgu){msg.channel.send(`BU KOMUTU KULLANABİLMEK İCİN ÖNCE JUQESTE BİAD ETMEN GEREKİYOR`)}
  if(sorgu == "ekle" || sorgu == "Ekle" || sorgu == "EKLE" || sorgu == "add" || sorgu == "Add" || sorgu == "ADD"){
  let tagq = args.splice(1).join(' ');
  if(!tagq) return client.message(client.normalEmbed(`Yasaklıya eklemek istediğin tagı belirtmelisin.`, msg), msg.channel.id)
  const YasaklıTagData = await ControlsDatabase.findOne({ guildID: msg.guild.id});
  let ytag = YasaklıTagData && YasaklıTagData.yasaklıtag;
  if(YasaklıTagData && ytag.includes(tagq)) return client.message(client.normalEmbed(`Yasaklıya atmak istediğin tag veritabanında zaten yasaklı.`, msg), msg.channel.id)
  if(!YasaklıTagData) {let newYasaklıTag = new ControlsDatabase({guildID: msg.guild.id, yasaklıtag: tagq}).save();} else{
  ytag.push(tagq)
  YasaklıTagData.save();} 
  let say = msg.guild.members.cache.filter(r=>r.user.tag.includes(tagq)).size
  msg.guild.members.cache.filter(x => (x.user.tag).includes(tagq) && !x.user.bot && !x.roles.cache.has(cfg.Roles.YasaklıTagRolü)).forEach(a => a.roles.cache.has(cfg.Roles.BoosterRolü) ?  a.roles.set([cfg.Roles.BoosterRolü, cfg.Roles.YasaklıTagRolü]) : a.roles.set([cfg.Roles.YasaklıTagRolü]));
  return  msg.channel.send(`Belirttiğiniz tag (\`${tagq}\`) listeye başarıyla eklendi! ${say ? `Bu tag'a sahip **${say}** üye bulundu. Hepsine Yasaklı Tag rolü verilmeye başlanıyor!`: ""}`)}
  if(sorgu == "liste" || sorgu == "Liste" || sorgu == "list" || sorgu == "List" || sorgu == "LİSTE" || sorgu == "LİST"){
  const YasaklıTagData = await ControlsDatabase.findOne({ guildID: msg.guild.id});
  let ytag = YasaklıTagData && YasaklıTagData.yasaklıtag;
  let TheVegas = ytag.map((x, index) => `\`${index+1}.\` ${x} ${msg.guild.members.cache.filter(r=>r.user.tag.includes(x)).size === 0 ? "" : `(${msg.guild.members.cache.filter(r=>r.user.tag.includes(x)).size} üye)`}`).join("\n")
  return msg.channel.send(new MessageEmbed().setColor(client.vegasRenkler[Math.floor(Math.random() * client.vegasRenkler.length)]).setAuthor(client.user.tag, client.user.avatarURL({dynamic:true})).setDescription(`${TheVegas ? TheVegas : "Sunucuda yasaklanmış tag bulunmamakta."}`))}
  if(sorgu == "Kontrol" || sorgu == "kontrol" || sorgu == "control" || sorgu == "controls"){
  const YasaklıTagData = await ControlsDatabase.findOne({ guildID: msg.guild.id});
   if(!(YasaklıTagData && YasaklıTagData.yasaklıtag)) return client.message(client.normalEmbed(`Veritabanında kontrol edilecek yasaklı tag bulunmuyor.`, msg), msg.channel.id)
  YasaklıTagData && YasaklıTagData.yasaklıtag.forEach(x => {
  let üye = msg.guild.members.cache.filter(mems => {
   return mems.user.tag.includes(x) && !mems.roles.cache.has(cfg.Roles.YasaklıTagRolü)}).map(x => x.id)
   if(üye.size === 'undefined') return client.message(client.normalEmbed(`${x} tagı bulunup yasaklı tag rolü olmayan üye yok.`, msg), msg.channel.id)
    msg.channel.send(`${x} tagı bulunup <@&${cfg.Roles.YasaklıTagRolü}> rolü olmayan ${üye.size ? üye.size: '0'} kişiye rolü veriyorum.`)
    for (let i = 0; i < üye.length;i++) {
    setTimeout(() => {
    msg.guild.members.cache.get(üye[i]).roles.add(cfg.Roles.YasaklıTagRolü)
    }, (i + 1) * 1000)}})}
  if (sorgu == "üye"||sorgu == "üyeler"||sorgu == "member"||sorgu == "members") {
  const YasaklıTagData = await ControlsDatabase.findOne({ guildID: msg.guild.id});
  let ytag = YasaklıTagData && YasaklıTagData.yasaklıtag;
  let tag = args[1]
  if (!tag) return client.message(client.normalEmbed("Üyelerini listelemek istediğin yasaklı tagı belirtmelisin.", msg), msg.channel.id)
  if (!ytag) return client.message(client.normalEmbed("Veritabanında listelenecek yasaklı tag bulunmuyor.", msg), msg.channel.id)
  if (!ytag.includes(args[1])) return client.message(client.normalEmbed("**" + ytag.join(",") + "** tag(ları) sunucuda yasaklanmış durumdadır. Belirttiğin tag veritabanında bulunmuyor.", msg), msg.channel.id)
  let üyeler = msg.guild.members.cache.filter(x => {
  return x.user.tag.includes(args[1])
  }).map(x => "<@" + x.id + "> - (`" + x.id + "`)")
  let üyelerk = msg.guild.members.cache.filter(x => {
  return x.user.tag.includes(args[1])
  }).map(x => "" + x.user.tag + " - (`" + x.id + "`)")
  let text = üyeler.join("\n")
  let texto = üyelerk.join("\n")
  const MAX_CHARS = 3 + 2 + text.length + 3;
  if (MAX_CHARS > 2000) {
  msg.channel.send("Sunucuda çok fazla yasaklı (" + args[1] + ") taga ait kişi var bu yüzden txt olarak göndermek zorundayım.", { files: [{ attachment: Buffer.from(texto), name: "yasakli-tagdakiler.txt" }] });
  } else {msg.channel.send(text ? text : "Sunucuda (" + args[1] + ") taga sahip üye bulunmuyor.")}}
  if(sorgu == "sil" || sorgu == "Sil" || sorgu == "SİL" || sorgu == "remove" || sorgu == "Remove" || sorgu == "REMOVE" || sorgu == "kaldır" || sorgu == "Kaldır"){
  const YasaklıTagData = await ControlsDatabase.findOne({ guildID: msg.guild.id});
  let tag = args.splice(1).join(' ');
  if(!tag) return client.message(client.normalEmbed(`Yasaklıdan çıkaracağın tagı belirtmelisin.`, msg), msg.channel.id)
  let ytag = YasaklıTagData && YasaklıTagData.yasaklıtag;
  if(YasaklıTagData && !ytag.includes(tag)) return client.message(client.normalEmbed(`Yasaklıdan çıkarmak istediğin tag zaten yasaklı değil.`, msg), msg.channel.id)
  if(!YasaklıTagData) {} else {
  if(YasaklıTagData.yasaklıtag.find(x => x == tag)) {
  YasaklıTagData.yasaklıtag = YasaklıTagData.yasaklıtag.filter(x => x != (tag || tag));
  YasaklıTagData.save()}};  
  let say = msg.guild.members.cache.filter(r=>r.user.tag.includes(tag)).size
  client.guilds.cache.get(cfg.Server.GuildID).members.cache.filter(uye =>  !uye.user.bot && uye.user.tag.includes(tag)).array().forEach(async(uye, index) => {
  client.setRoles(uye.id, cfg.Roles.KayıtsızRolü)})
  return msg.channel.send(`Belirttiğiniz tag (\`${tag}\`) listeden başarıyla kaldırıldı! ${say ? `Bu tag'a sahip **${say}** üye bulundu. Hepsinden Yasaklı Tag rolü kaldırılıyor!`: ""}`)}}}
