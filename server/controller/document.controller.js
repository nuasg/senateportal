var mongoose = require("mongoose");
var moment = require("moment");
var Document = require("../models/document");
var Legislation = require("../models/legislation");

// Add
module.exports.addDocument = function (req, res) {
	req.body.weekOf = moment(req.body.weekOf).startOf('week').add(3, 'days').add(19, 'hours').toJSON();
	req.body.order = parseInt(req.body.order, 10);
	if (req.body.live) {
		req.body.live = (req.body.live === "true");
	}
	const doc = new Document(req.body)
	doc.
		save().
		then((doc) => {
			res.sendStatus(200);
		}).
		catch((err) => {
			res.sendStatus(err);
		});
}

// Get All
module.exports.findAllDocuments = function (req, res) {
	Document.
		find({}).
		exec().
		then(function(doc) {
			res.json(doc);
		}).
		catch(function(err) {
			res.sendStatus(err);
		});
}
// Get by Id
module.exports.getDocumentId = function (req, res) {
	Document.
		findById(req.params.id).
		exec().
		then(function (doc){
			res.json(doc);
		}).
		catch(function(err) {
			res.sendStatus(err);
		});
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
		}).
		exec().
		then(function (doc) {
			res.json(doc);
		}).
		catch(function (err){	
			res.send(err);	
		});
}
// Delete document
module.exports.deleteDocument = function (req, res) {
	Document.
		remove({
			_id: req.body._id
		}).
		exec().
		then(function (event) {
			res.sendStatus(200);
		}).
		catch(function (err) {
			res.send(err);
		});
}
// Update document
module.exports.updateDocument = function (req, res) {
	req.body.weekOf = moment(req.body.weekOf).startOf('week').add(3, 'days').add(19, 'hours').toJSON();
	req.body.order = parseInt(req.body.order, 10);
	if (req.body.live) {
		req.body.live = (req.body.live === "true");
	}
	Document.
		findOneAndUpdate({ '_id': req.body._id }, req.body).
		exec().
		then(function () {
			res.sendStatus(200);
		}).
		catch(function (err) {
			res.send(err);
		});
}

module.exports.getdocumentByDateRange = function(req, res) {
	var start = new Date(req.params.start);
	var end = new Date(req.params.end);
	Document.
		aggregate([
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
		]).
		exec().
		then(function (data) {
			data.map(function(obj){
				obj.year = moment(obj.weekOf).startOf('year');
				obj.month = moment(obj.weekOf).startOf('month');
				obj.day = moment(obj.weekOf).startOf('day');
				return obj;
			});
			res.json(data);
		}).
		catch(function (err) {
			res.send(err);
		});
}

