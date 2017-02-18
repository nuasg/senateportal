var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var attendenceSchema = new Schema({
    weekOf          : Date,
    firstName       : String,
    lastName        : String,
    email           : String,
    group           : String
})

module.exports = mongoose.model('attendence', attendenceSchema);