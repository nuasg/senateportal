var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var LegislationDocumentSchema = new Schema({
	document			: String,
	legislation 		: String
})

module.exports = mongoose.model('legislationDocument', LegislationDocumentSchema);