var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var TermSchema = new Schema({
	term_id				: Number,
	name				: String,
	start_date			: Date,
	end_date			: Date
})

module.exports = mongoose.model('term', TermSchema);