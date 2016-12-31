const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

const Account = new Schema({
    username: String,
    password: String,
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
});

Account.virtual('leave_year_end').get(function() {
 
			
				return new Date(moment(this.leave_start).add(1, 'years'));

});
Account.set('toObject', { virtuals: true });
Account.set('toJSON', { virtuals: true });

Account.plugin(passportLocalMongoose);

module.exports = mongoose.model('accounts', Account);
