const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const schema = Schema({
  title: String,
  description: String,
  status: Boolean
});
const model = mongoose.model("todo", schema);
module.exports = model;
