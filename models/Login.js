var mongoose = require('mongoose');



 Schema = mongoose.Schema
var LoginSchema = new mongoose.Schema({
  user:  { type: String, unique: true },
    password:  { type: String, unique: true ,required:true},
   role:  { type: String }

});


LoginSchema.set('toObject', { virtuals: true });
LoginSchema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Login', LoginSchema);
