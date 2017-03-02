(function(){
    angular.module("senator")
    .controller("SenateDocsController",["$scope", "$state", "$http", function($scope, $state, $http){
        'use strict';
        var getVotes = function (idToLegislationMap, userMap) {
            $http.get("/senate/api/legislation").success(function(votes){
                    var legislationToVoteMap = {};
                    votes.forEach(function(vote){
                        var pair = idToLegislationMap[vote.documentId];
                        if (pair == undefined) {
                            return;
                        }
                        if (legislationToVoteMap[idToLegislationMap[vote.documentId][0]]) {
                            if (legislationToVoteMap[idToLegislationMap[vote.documentId][0]][vote.vote]) {
                                legislationToVoteMap[idToLegislationMap[vote.documentId][0]][vote.vote].push(userMap[vote.netid]);
                            } else {
                                legislationToVoteMap[idToLegislationMap[vote.documentId][0]][vote.vote] = [userMap[vote.netid]];
                            }
                        } else {
                            var value = idToLegislationMap[vote.documentId][0];
                            legislationToVoteMap[value] = {};
                            legislationToVoteMap[value][vote.vote] = [userMap[vote.netid]];
                            legislationToVoteMap[value].date = idToLegislationMap[vote.documentId][1];
                            legislationToVoteMap[value].link = idToLegislationMap[vote.documentId][2];
                        }
                    });
                    $scope.legislationToVoteMap = legislationToVoteMap;
                });

        }
        var getDocs = function () {
            $http.get("/senate/api/document").success(
            function(data) {
                $scope.data = data.map(function(obj){
                    obj.weekOf = new Date(obj.weekOf);
                    return obj;
                });
                var idToLegislationMap = {}
                $scope.data.forEach(function(obj){
                    if (obj.type == "Legislation"){
                        idToLegislationMap[obj._id] = [obj.title, obj.weekOf, obj.link];
                    }
                });
                $http.get("/senate/api/user").success(function(users){
                    var userMap = {};
                    users.forEach(function(user){
                        userMap[user.netid] = user.firstName + " " + user.lastName;
                    });
                    getVotes(idToLegislationMap, userMap);
                })
            });
        }
        $scope.click = function (key, val) {
            $scope.selectedKey = key;
            $scope.selectedValue = val;
        }
        getDocs();
        var pullDocs = window.setInterval(getDocs, 15000);
    }]);
}());
