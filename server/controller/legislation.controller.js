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
    const request = {
        documentId: req.params.documentId,
        netid: req.user.nuIdTag
    };
    Legislation.
        find(request).
        exec().
        then(function(legislation) {
            if (legislation.length) {
                res.json(legislation);
            } else {
                res.sendStatus(404);
            }
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
                findOneAndUpdate({netid: req.body.netid, documentId: req.body.documentId}, req.body).
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

module.exports.getByUser = function (req, res) {
    Legislation.
        find({
            netid: req.params.netid
        }).
        exec().
        then(function(legis){
            var promises = legis.map(function(leg){
                return Document.
                    findOne({
                        _id: leg.documentId
                    }).
                    then(function(doc){
                        leg._doc.docName = doc.title;
                        return leg;
                    }).
                    catch(function(err){
                        return undefined;
                    });
            });
            Promise.all(promises).then(function(data){
                var final = data.filter(function(leg){
                    if (leg !== undefined) {
                        return leg;
                    }
                });
                res.json(final);
            });
        }).
        catch(function(err){
            res.sendStatus(err);
        });
}
