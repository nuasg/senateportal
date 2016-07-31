var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var BusinessSchema = new Schema({
	weekOf			: Date,
	title			: String,
	link			: String,
	attendence		: Boolean,
	result			: Object
})

module.exports = mongoose.model('Business', BusinessSchema);