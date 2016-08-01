var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var UserSchema = new Schema({
	netid			: String,
	email			: String,
	firstName		: String,
	lastName		: String,
	group			: String,
	role 			: String
})

module.exports = mongoose.model('User', UserSchema);