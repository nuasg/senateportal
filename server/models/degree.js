var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var DegreeSchema = new Schema({
	name			: String,
	school			: String,
	major	 		: String,
	requirements	: Array
})

module.exports = mongoose.model('Degree', DegreeSchema);