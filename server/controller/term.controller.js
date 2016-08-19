var mongoose = require("mongoose");
var request = require("request");
var Term = require("../models/term");

module.exports.getTerms = function (req, res) {
	Term.find(function(err, terms) {
		if (err) {
			res.sendStatus(err);
		} else {
			res.json(terms);
		}
	});
}
// Code for getting all
// request(
// 	{
// 		uri: "http://api.asg.northwestern.edu/terms/?key=Lin7aFgHOlr6q9qJ",
// 		method: "GET"
// 	}, function(err, response, body){
// 		var data = JSON.parse(body);
// 		data.forEach(function(obj){
// 			obj.start_date = new Date(obj.start_date);
// 			obj.end_date = new Date(obj.end_date);
// 			Term.create(obj, function(err, event) {
// 				if (err) {
// 					console.log(err);
// 				} else {
// 					console.log("Success");
// 				}
// 			});
// 		});
// 	}
// );
