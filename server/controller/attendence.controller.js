var mongoose = require("mongoose");
var moment = require("moment");
var Attendence = require("../models/attendence");

module.exports.addAttendence = function (req, res) {
    var weekOf = new Date();
    req.body.weekOf = moment(weekOf).startOf('week').add(3, 'days').add(19, 'hours').toJSON();
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
    var start = new Date(req.params.start);
    var end = new Date(req.params.end);
    Attendence.
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
                    firstName: 1,
                    lastName: 1,
                    email: 1,
                    group: 1,
                    present: 1
                }
            }
        ]).
        exec().
        then(function (data) {
            var final = {}
            data.forEach(function(obj){
                if (obj.weekOf in final) {
                    final[weekOf].present += obj.present ? 1 : 0;
                    final[weekOf].absent += obj.present ? 0 : 1;
                } else {
                    final[weekOf] = {
                        present: obj.present ? 1 : 0,
                        absent: obj.present ? 0 : 1
                    };
                }
            });
            res.json(final);
        }).
        catch(function (err) {
            res.send(err);
        });
}

module.exports.getAttendenceByDateRange = function (req, res) {
    var start = new Date(req.params.start);
    var end = new Date(req.params.end);
    Attendence.
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
                    firstName: 1,
                    lastName: 1,
                    email: 1,
                    group: 1,
                    present: 1
                }
            }
        ]).
        exec().
        then(function (data) {
            var final = {}
            data.forEach(function(obj){
                var name = obj.firstName + " " + obj.lastName;
                if (name in final) {
                    if (obj.present) {
                        final[name].times.here++;
                    } else {
                        final[name].times.absent++;
                    }
                } else {
                    final[name] = {
                        times: {
                            here: obj.present ? 1 : 0,
                            absent: obj.present ? 0 : 1
                        },
                        group: obj.group
                    };
                }
            });
            res.json(final);
        }).
        catch(function (err) {
            res.send(err);
        });
}
