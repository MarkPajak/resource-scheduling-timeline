var mongoose = require('mongoose');

var TallySchema = new mongoose.Schema({
  name: String,
  date: Date,
  points:Number,
  note: String
});

module.exports = mongoose.model('Tally', TallySchema);
