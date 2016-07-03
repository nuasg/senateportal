var mongoose = require("mongoose");
var Major = require("../models/major");

module.exports.findAllMajors = function (req, res) {
	Major.find(function(err, major){
		if (err) {
			res.send(err);
		} else {
			res.json(major);
		}
	});
}

module.exports.findByMajor = function (req, res) {
	Major.find({
		name: req.params.major_name
	}, function(err, major) {
		res.json(major);
	});
}

module.exports.createMajor = function (req, res) {
	Major.create({
		name 			:req.body.name,
		classes 	:[req.body.classes]
	}, function(err, major) {
		if (err) {
			res.send(err);
		} else {
			res.json({"response": true});
		}
	});	
}