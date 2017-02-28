var mongoose = require("mongoose");
var User = require("../models/user");

module.exports.addUser = function (req, res) {
	if (req.body.active) {
		req.body.active = (req.body.active === "true");
	}
	var user = new User(req.body);
	user.
		save().
		then(function () {
			res.sendStatus(200);
		}).
		catch(function (err) {
			res.sendStatus(err);
		});
}

module.exports.getUsers = function (req, res) {
	User.
		find({}).
		exec().
		then(function(users) {
			res.json(users);
		}).
		catch(function(err) {
			res.sendStatus(err);
		});
}

module.exports.updateUser = function (req, res) {
	var request = {};
	if (req.body.active) {
		req.body.active = (req.body.active === "true");
	}
	if (req.body._id) {
		request._id = req.body._id;
	} else {
		request.netid = req.body.netid;
	}
	if (!req.body.callback) {
		var success = () => {
			res.sendStatus(200);
		};
		var failure = (err) => {
			res.sendStatus(err);
		};
	} else {
		var success = req.body.callback;
		var failure = req.body.callback;
	}
	User.
		findOneAndUpdate(request, req.body).
		exec().
		then(success).
		catch(failure);
}

module.exports.findUser = function (req, res) {
	if (!req.body.success) {
		var success = () => {
			res.sendStatus(200);
		};
		var failure = (err) => {
			res.sendStatus(err);
		};
	} else {
		var success = req.body.success;
		var failure = req.body.failure;
	}
	User.
		findOne({netid: req.body.netid}).
		exec().
		then(success).
		catch(failure);
}

module.exports.deleteUser = function (req, res) {
	User.
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

module.exports.addSub = function (req, res) {
	User.findOneAndUpdate({ netid: req.body.senatorNetid }, {$set: {active: false}}).exec();
	User.
		find({
			netid: req.body.subNetid
		}).
		exec().
		then(function(users) {
			if (users.length > 0) {
				User.findOneAndUpdate({netid: req.body.subNetid}, {$set: {active: true}})
					.exec()
					.then(function(){
						res.sendStatus(200);
					})
					.catch(function(err){
						res.sendStatus(err);
					})
			} else {
				var user = new User({
					netid: req.body.subNetid,
					role: "Senator",
					group: req.body.group,
					active: true,
					sub: 	true
				});
				user.
					save().
					then(function () {
						res.sendStatus(200);
					}).
					catch(function (err) {
						res.sendStatus(err);
					});
			}
		}).
		catch(function(err) {
			res.sendStatus(err);
		});
}

module.exports.findSub = function (req, res) {
	User.
		find({sub : req.params.netid}).
		exec().
		then(function(user){
			if (user.length) {
				res.sendStatus(200);
			} else {
				res.sendStatus(400);
			}
		}).
		catch(function(err) {
			res.sendStatus(err);
		});
}