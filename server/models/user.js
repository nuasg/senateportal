var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var UserSchema = new Schema({
	email			: String,
	password		: String,
	name			: String,
	majors			: Array,
	minors			: Array,
	certificates 	: Array,
	degree			: String,
	classes 		: Array
})

module.exports = mongoose.model('User', UserSchema);