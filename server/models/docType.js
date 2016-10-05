var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var docTypeSchema = new Schema({
	type				: String
})

module.exports = mongoose.model('docType', docTypeSchema);