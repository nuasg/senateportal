var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var MinorSchema = new Schema({
	name			: String,
	classes 		: Array
})

module.exports = mongoose.model('Minor', MinorSchema);