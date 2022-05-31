const { Schema, model } = require("mongoose");

const schema = Schema({
  guildID: { type: String, default: "" },
  userID: { type: String, default: "" },
  Invite: { type: Array, default: [] },
  InviteCount: { type: Number, default: 0 },
  InviteDurum: { type: String, default: "Devam Ediyor." },
  Voice: { type: Array, default: [] },
  VoiceCount: { type: Number, default: 0 },
  VoiceDurum: { type: String, default: "Devam Ediyor." },
  Kurabiye: { type: Array, default: [] },
  KurabiyeCount: { type: Number, default: 0 },
  KurabiyeDurum: { type: String, default: "Devam Ediyor." },
  Tag: { type: Array, default: [] },
  TagCount: { type: Number, default: 0 },
  TagDurum: { type: String, default: "Devam Ediyor." },
  Kayıt: { type: Array, default: [] },
  KayıtCount: { type: Number, default: 0 },
  KayıtDurum: { type: String, default: "Devam Ediyor." },
  Message: { type: Array, default: [] },
  MessageCount: { type: Number, default: 0 },
  MessageDurum: { type: String, default: "Devam Ediyor." },
  Date: { type: Number, default: Date.now() },
});

module.exports = model("görev", schema);