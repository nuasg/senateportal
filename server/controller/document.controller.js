var mongoose = require("mongoose");
var Document = require("../models/document");
var moment = require("moment");
// Add
module.exports.addDocument = function (req, res) {
	req.body.weekOf = moment(req.body.weekOf).startOf('week').add(3, 'days').add(19, 'hours').toJSON();
	req.body.order = parseInt(req.body.order, 10);
	Document.create(req.body, function(err, event) {
		if (err) {
			res.sendStatus(err);
		} else {
			res.sendStatus(200);
		}
	});
}
// Get All
module.exports.findAllDocuments = function (req, res) {
	Document.find(function(err, doc) {
		if (err) {
			res.sendStatus(err);
		} else {
			res.json(doc);
		}
	});
}
// Get by Id
module.exports.getDocumentId = function (req, res) {
	Document.findById(req.params.id,
		function (err, doc){
			if (err)
				res.send(err);
			res.json(doc);
		}
	);
}
// Get by Week
module.exports.getDocumentByWeek = function (req, res) {
	var date = moment(req.params.date);
	var start = date.clone().startOf('week');
	var end = date.clone().endOf('week');
	Document.find(
		{
			'weekOf': 
				{
					$gte: start,
					$lte: end
				}
		},
		function (err, doc){
			if (err)
				res.send(err);
			res.json(doc);
		}
	);
}
// Delete document
module.exports.deleteDocument = function (req, res) {
	Document.remove({
		_id: req.body._id
	}, function(err, event) {
		if (err) {
			res.sendStatus(err);	
		} else {
			res.sendStatus(200);
		}
	});
}
// Update document
module.exports.updateDocument = function (req, res) {
	req.body.weekOf = moment(req.body.weekOf).startOf('week').add(3, 'days').add(19, 'hours').toJSON();
	req.body.order = parseInt(req.body.order, 10);
	Document.findOneAndUpdate({ '_id': req.body._id }, req.body,
		function (err, events ) {
			if (err) {
				res.sendStatus(err);
			} else {
				res.sendStatus(200);
			}
	});
}

module.exports.getdocumentByDateRange = function(req, res) {
	var start = new Date(req.params.start);
	var end = new Date(req.params.end);
	Document.aggregate([
		{
			$match: {
				'weekOf': 
					{
						$gte: start,
						$lte: end
					}
			}
		},
		{
			$project: {
				title: 1,
				link: 1,
				description: 1,
				type: 1,
				ordering: 1,
				weekOf: 1,
				month: { $month: "$weekOf" },
				day: { $dayOfMonth: "$weekOf" },
				year: { $year: "$weekOf"}
			}
		}
	]).then(function (data) {
		data.map(function(obj){
			obj.year = moment(obj.weekOf).startOf('year');
			obj.month = moment(obj.weekOf).startOf('month');
			obj.day = moment(obj.weekOf).startOf('day');
			return obj;
		});
		res.json(data);
	}, function (err) {
		res.send(err);
	});
}

