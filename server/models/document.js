var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var DocumentSchema = new Schema({
	weekOf			: Date,
	title			: String,
	link			: String,
	description		: String,
	type 			: String,
	ordering		: Number
})

module.exports = mongoose.model('document', DocumentSchema);