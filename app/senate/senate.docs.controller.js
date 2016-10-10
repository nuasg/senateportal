(function(){
    angular.module("senator")
    .controller("SenateDocsController",["$scope", "$state", "$http", function($scope, $state, $http){
        'use strict';
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
    }]);
}());