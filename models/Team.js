var mongoose = require('mongoose');
var moment = require('moment');
require('moment-weekday-calc');
 Schema = mongoose.Schema
var TeamSchema = new mongoose.Schema({
  name:  { type: String, unique: true },
  team: String,
  job: String,
  trello_doing_id:String,
  score:Number,
  bonus:Number,
  penalty:Number,
  leave_start:Date,
  number_days_leave:Number,
  number_days_leave_remaining:Number,
  leave_taken : [{ type: Schema.Types.ObjectId, ref: 'Leave' }],
    user:  { type: String, unique: true },
    password:  { type: String, unique: true ,required:true},
   role:  { type: String },
  card_count:Number
});
TeamSchema.virtual('leave_year_end').get(function() {
 
			
				return new Date(moment(this.leave_start).add(1, 'years'));

});

TeamSchema.set('toObject', { virtuals: true });
TeamSchema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Team', TeamSchema);
