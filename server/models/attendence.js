var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var attendenceSchema = new Schema({
    weekOf          : Date,
    firstName       : String,
    lastName        : String,
    email           : String,
    present         : Boolean,
    group           : String
})

module.exports = mongoose.model('attendence', attendenceSchema);