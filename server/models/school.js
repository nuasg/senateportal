var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var SchoolSchema = new Schema({
	name			: String,
	majors	 	: Array,
	requirements	: Array
})

module.exports = mongoose.model('School', SchoolSchema);