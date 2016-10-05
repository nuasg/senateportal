var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var LegislationSchema = new Schema({
    netid    : String,
    vote        : String,
    documentId  : String
})

module.exports = mongoose.model('Legislation', LegislationSchema);