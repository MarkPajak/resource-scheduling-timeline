var mongoose = require('mongoose');

var TodoSchema = new mongoose.Schema({
  name: String,
  date: Date,
  note: String
});

module.exports = mongoose.model('Todo', TodoSchema);
