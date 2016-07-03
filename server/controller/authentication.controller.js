var mongoose = require("mongoose");
var User = require("../models/user");

module.exports.signup = function (req, res) {
	var user = new User(req.body);
	user.save();

	res.json(req.body);
}