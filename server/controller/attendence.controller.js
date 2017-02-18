var mongoose = require("mongoose");
var Attendence = require("../models/attendence");

module.exports.addAttendence = function (req, res) {
    var attendence = new Attendence(req.body);
    attendence.
        save().
        then(function () {
            res.sendStatus(200);
        }).
        catch(function (err) {
            res.sendStatus(err);
        });
}

module.exports.getAttendence = function (req, res) {
    Attendence.
        find({}).
        exec().
        then(function(attendence) {
            res.json(attendence);
        }).
        catch(function(err) {
            res.sendStatus(err);
        });
}