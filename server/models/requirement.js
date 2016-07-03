var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var RequirementSchema = new Schema({
	name			: String,
	classes			: Array
})

module.exports = mongoose.model('Requirement', RequirementSchema);