const { Schema, model } = require("mongoose");

const schema = Schema({
    user: { type: String }, 
    mod: {type: String},
    sebep: {type: String}
});

module.exports = model("açılmazban", schema);