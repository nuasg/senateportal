var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var MajorSchema = new Schema({
	name			: String,
	classes			: Array
})

module.exports = mongoose.model('Major', MajorSchema);