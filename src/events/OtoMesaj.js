const client = global.client;
const cfg = require("../configs/config.json");

module.exports = async (msg) => {
  
  if(msg.author.bot || msg.channel.type === "dm") return;
  if(msg.content ===".tag"|| msg.content ==="tag"|| msg.content ==="!tag"|| msg.content ==="Tag"|| msg.content ==="TAG"){
    msg.channel.send(`\`\`\`Wénc | 1934\`\`\``)
}
  
  if(msg.content === "!link"||msg.content === ".link"||msg.content === "link" ||msg.content === "Link") {
  msg.channel.send(`${cfg.Server.DavetLink} ${msg.author}`)}
}

module.exports.conf = {
  name: "message",
};

