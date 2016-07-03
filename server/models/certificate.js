var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var CertificateSchema = new Schema({
	name			: String,
	classes			: Array
})

module.exports = mongoose.model('Certificate', CertificateSchema);