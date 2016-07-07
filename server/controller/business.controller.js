var mongoose = require("mongoose");
var Business = require("../models/business");
var moment = require("moment");
// Add
module.exports.addbusiness = function (req, res) {
	req.body.weekOf = moment(req.body.weekOf).startOf('week').add(3, 'days').add(19, 'hours').toJSON();
	Business.create(req.body, function(err, event) {
		if (err) {
			res.sendStatus(err);
		} else {
			res.sendStatus(200);
		}
	});
}
// Get All
module.exports.findAllBusiness = function (req, res) {
	Business.find(function(err, business) {
		if (err) {
			res.sendStatus(err);
		} else {
			res.json(business);
		}
	});
}
// Get by Id
module.exports.getBusinessId = function (req, res) {
	Business.findById(req.params.id,
		function (err, business){
			if (err)
				res.send(err);
			res.json(business);
		}
	);
}
// Get by Week
module.exports.getBusinessByWeek = function (req, res) {
	var date = moment(req.params.date);
	var start = date.clone().startOf('week');
	var end = date.clone().endOf('week');
	Business.find(
		{
			'weekOf': 
				{
					$gte: start,
					$lte: end
				}
		},
		function (err, business){
			if (err)
				res.send(err);
			res.json(business);
		}
	);
}
// Delete Business
module.exports.deleteBusiness = function (req, res) {
	Business.remove({
		_id: req.body._id
	}, function(err, event) {
		if (err) {
			res.sendStatus(err);	
		} else {
			res.sendStatus(200);
		}
	});
}
// Update Business
module.exports.updateBusiness = function (req, res) {
	req.body.weekOf = moment(req.body.weekOf).startOf('week').add(3, 'days').add(19, 'hours').toJSON();
	Business.findOneAndUpdate({ '_id': req.body._id }, req.body,
		function (err, events ) {
			if (err) {
				res.sendStatus(err);
			} else {
				res.sendStatus(200);
			}
	});
}

