var mongoose = require('mongoose');

var TeamSchema = new mongoose.Schema({
  name: String,
  trello_doing_id:String,
  score:Number,
  bonus:Number,
  penalty:Number,
  card_count:Number
});

module.exports = mongoose.model('Team', TeamSchema);
