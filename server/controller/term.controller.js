var mongoose = require("mongoose");
var request = require("request");
var Term = require("../models/term");
var _ = require('lodash');

module.exports.getTerms = function (req, res) {
	const date = new Date(req.params.date);
	Term.
		find({}).
		exec().
		then(function(terms) {
			const term_values = _.map(terms, '_doc');
			if (isNewDate(term_values, date)){
				queryAPI((err, response, body) => {
					const data = JSON.parse(body);
					const makingTerms = _(data).
						differenceBy(term_values, 'name').
						each((obj) => {
							Term.create(obj);
						});
					res.json(data);
				});
			} else {
				res.json(_.orderBy(terms, 'start_date', 'desc'));
			}
		}).
		catch(function (err) {
			res.sendStatus(err);
		});
}

const isNewDate = (terms, newDate) => {
	let New = true;
	_.forEach(terms, (term) => {
		const endDate = new Date(term.end_date);
		if (endDate > newDate) {
			New = false;
		}
	});
	return New;
}

const queryAPI = (callback) => {
	request({
		uri: process.env.API_KEY,
		method: "GET"
	}, callback);
}

// Code for getting all
// request(
// 	{
// 		uri: process.env.API_KEY,
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
