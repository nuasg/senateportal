var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var UserSchema = new Schema({
	email			: String,
	password		: String,
	name			: String,
	role 			: String
})

module.exports = mongoose.model('User', UserSchema);