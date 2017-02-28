(function(){
    angular.module("senator")
    .controller("SenateSubController",["$scope", "$state", "$http", function($scope, $state, $http){
        'use strict';
        $http.get("/senate/api/whoami").success(function(user){
            $http.get("/senate/api/user/sub/" + user.netid).success(function(data){
                $scope.existingSub = true;
            }).error(function(value){
                $scope.existingSub = false;
            });
        });
    }]);
}());