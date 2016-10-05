var mongoose = require("mongoose");
var Legislation = require("../models/legislation");
var Document = require("../models/document");


const findDoc = (id, responseFunc) => {
    Document.
        findById(id).
        exec().
        then(responseFunc).
        catch(function(err) {
            res.sendStatus(err);
        });
};

module.exports.addLegislation = function (req, res) {
    req.body.netid = req.user.nuIdTag;
    findDoc(req.body.documentId,  function (doc) {
        if (doc.live) {
            Legislation.create(req.body);
            res.sendStatus(200);
        } else {
            res.sendStatus(412);
        }
    })
}

module.exports.getLegislations = function (req, res) {
    Legislation.
        find({}).
        exec().
        then(function(legislations) {
            res.json(legislations);
        }).
        catch(function(err) {
            res.sendStatus(err);
        });
}

module.exports.getLegislation = function (req, res) {
    const req = {
        documentId: req.params.documentId,
        netid: req.user.nuIdTag
    };
    Legislation.
        find(req).
        exec().
        then(function(legislation) {
            res.json(legislation);
        }).
        catch(function(err) {
            res.sendStatus(err);
        });
}

module.exports.getLegislation = function (req, res) {
    const req = {
        documentId: req.params.documentId,
    };
    Legislation.
        find(req).
        exec().
        then(function(legislations) {
            res.json(legislations);
        }).
        catch(function(err) {
            res.sendStatus(err);
        });
}

module.exports.updateLegislation = function (req, res) {
    req.body.netid = req.user.nuIdTag;
    findDoc(req.body.documentId, function (doc) {
        if (doc.live) {
            Legislation.
                findOneAndUpdate({_id: req.body._id}, req.body).
                exec().
                then(() => {
                    res.sendStatus(200);
                }).
                catch((err) => {
                    res.sendStatus(err);
                });
        } else {
            res.sendStatus(412);
        }
    });
}

module.exports.deleteLegislation = function (req, res) {
    Legislation.
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
