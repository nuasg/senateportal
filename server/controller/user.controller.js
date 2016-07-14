var mongoose = require("mongoose");
var User = require("../models/user");

module.exports.addUser = function (req, res) {
	User.create(req.body, function(err, event) {
		if (err) {
			res.sendStatus(err);
		} else {
			res.sendStatus(200);
		}
	});
}

module.exports.getUsers = function (req, res) {
	User.find(function(err, users) {
		if (err) {
			res.sendStatus(err);
		} else {
			res.json(users);
		}
	});
}

module.exports.updateUser = function (req, res) {
	User.findOneAndUpdate({ '_id': req.body._id }, req.body,
		function (err, events ) {
			if (err) {
				res.sendStatus(err);
			} else {
				res.sendStatus(200);
			}
	});
}


