const { Schema, model } = require("mongoose");

const schema = Schema({
    user: { type: String }, 
    notlar: {type: Array }
});

module.exports = model("notlar", schema);