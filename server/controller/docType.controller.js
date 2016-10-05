var mongoose = require("mongoose");
var DocType = require("../models/docType");

module.exports.addDocType = function (req, res) {
	var docType = new DocType(req.body);
	docType.
		save().
		then(function () {
			res.sendStatus(200);
		}).
		catch(function (err) {
			res.sendStatus(err);
		});
}

module.exports.getDocTypes = function (req, res) {
	DocType.
		find({}).
		exec().
		then(function(docTypes) {
			res.json(docTypes);
		}).
		catch(function(err) {
			res.sendStatus(err);
		});
}

module.exports.updateDocType = function (req, res) {
	DocType.
		findOneAndUpdate({_id: req.body._id}, req.body).
		exec().
		then(() => {
			res.sendStatus(200);
		}).
		catch((err) => {
			res.sendStatus(err);
		});
}

module.exports.deleteDocType = function (req, res) {
	DocType.
		remove({
			_id: req.body._id
		}).
		exec().
		then(function() {
			res.sendStatus(200);
		}).
		catch(function(err) {
			res.sendStatus(err);
		});
}
