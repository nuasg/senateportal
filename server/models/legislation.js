var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var LegislationSchema = new Schema({
	for			: [],
	against		: []
})

module.exports = mongoose.model('Legislation', LegislationSchema);