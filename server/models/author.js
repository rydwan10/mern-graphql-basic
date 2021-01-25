const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const authroSchema = new Schema({
  name: String,
  age: Number,
});

module.exports = mongoose.model("Author", authroSchema);
