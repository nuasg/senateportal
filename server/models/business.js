var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var BusinessSchema = new Schema({
	weekOf			: Date,
	title				: String,
	link				: String,
	attendence	: Boolean
})

module.exports = mongoose.model('Business', BusinessSchema);