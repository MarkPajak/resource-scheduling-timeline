var mongoose = require('mongoose');

var TimelineSchema = new mongoose.Schema({
		  name: String,
		  start_date: Date,
		  end_date: Date,
		  group: String,
		  _type: String,
		  className:String,
		  content: String,
		  name: String,
		  notes:String,
		  days:Number
});




module.exports = mongoose.model('Timeline', TimelineSchema);
