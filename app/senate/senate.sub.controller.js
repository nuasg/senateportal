(function(){
    angular.module("senator")
    .controller("SenateSubController",["$scope", "$state", "$http", function($scope, $state, $http){
        'use strict';
        var getData = function () {
            $http.get("/senate/api/whoami").success(function(user){
                $scope.user = user;
                $scope.canSub = !user.sub;
                $http.get("/senate/api/user/sub/" + user.netid).success(function(data){
                    if (data !== null) {
                        $scope.existingSub = true;
                        $scope.subNetid = data.netid;
                    } else {
                        $scope.existingSub = false;
                    }
                }).error(function(value){
                    $scope.existingSub = false;
                });
            });
        }
        getData();
        $scope.addSub = function (netid) {
            $http.post("/senate/api/user/sub", {
                "subNetid": netid,
                "senatorNetid": $scope.user.netid,
                "group": $scope.user.group
            }).success(function(data){
                alert("Added Sub");
                getData();
            });
        }
        $scope.relieve = function () {
            $http.post("/senate/api/user/sub/relieve",{
                "subNetid": $scope.subNetid,
                "senatorNetid": $scope.user.netid
            }).success(function(data){
                alert("Relieved Sub of duties");
                getData();
            });
        }
    }]);
}());
