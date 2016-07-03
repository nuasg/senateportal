var mongoose = require("mongoose");
var School = require("../models/school");

module.exports.findSchools = function (req, res) {
	School.find(function(err, schools){
		if (err) {
			res.send(err);
		} else {
			res.json(schools);
		}
	});
}

module.exports.findBySchool = function (req, res) {
	School.find({
		name: req.params.school_name
	}, function(err, major) {
		res.json(major);
	});
}