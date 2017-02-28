(function(){
    angular.module("senator")
    .controller("SenateDocsController",["$scope", "$state", "$http", function($scope, $state, $http){
        'use strict';
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
                        idToLegislationMap[obj._id] = [obj.title, obj.weekOf];
                    }
                });
                $http.get("/senate/api/legislation").success(function(votes){
                    var legislationToVoteMap = {};
                    votes.forEach(function(vote){
                        var pair = idToLegislationMap[vote.documentId];
                        if (pair == undefined) {
                            return;
                        }
                        if (legislationToVoteMap[idToLegislationMap[vote.documentId][0]]) {
                            if (legislationToVoteMap[idToLegislationMap[vote.documentId][0]][vote.vote]) {
                                legislationToVoteMap[idToLegislationMap[vote.documentId][0]][vote.vote] += 1;
                            } else {
                                legislationToVoteMap[idToLegislationMap[vote.documentId][0]][vote.vote] = 1;
                            }
                        } else {
                            var value = idToLegislationMap[vote.documentId][0];
                            legislationToVoteMap[value] = {};
                            legislationToVoteMap[value][vote.vote] = 1;
                            legislationToVoteMap[value].date = idToLegislationMap[vote.documentId][1];
                        }
                    });
                    $scope.legislationToVoteMap = legislationToVoteMap;
                });
            });
        }
        getDocs();
        var pullDocs = window.setInterval(getDocs, 15000);
    }]);
}());
