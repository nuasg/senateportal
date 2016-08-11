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
	var request = {};
	if (req.body._id) {
		request._id = req.body._id;
	} else {
		request.netid = req.body.netid;
	}
	if (!req.body.callback) {
		var callback = (err, events) => {
			if (err) {
				res.sendStatus(err);
			} else {
				res.sendStatus(200);
			}
		};
	} else {
		var callback = req.body.callback;
	}
	User.findOneAndUpdate(request, req.body, callback);
}

module.exports.findUser = function (req, res) {
	if (!req.body.callback) {
		var callback = (err, user) => {
			if (err) {
				res.sendStatus(err);
			} else {
				res.json(user);
			}
		}
	} else {
		var callback = req.body.callback;
	}
	User.findOne({netid: req.body.netid}, callback);
}

module.exports.deleteUser = function (req, res) {
	User.remove({
		_id: req.body._id
	}, function(err, event) {
		if (err) {
			res.sendStatus(err);	
		} else {
			res.sendStatus(200);
		}
	});
}
