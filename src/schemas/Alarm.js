const { Schema, model } = require("mongoose");

const schema = Schema({
    user: { type: String }, 
    alarm: { type: Boolean, default: false},
    sebep: { type: String, default: ""},
    endDate: {type: Date, default: null},
    channel: {type: String, default: ""} 
});

module.exports = model("alarm", schema);