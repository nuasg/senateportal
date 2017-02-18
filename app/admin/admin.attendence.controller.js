(function(){
	angular.module("senator")
	.controller("AdminAttendenceController",["$scope", "$state", "$http", function($scope, $state, $http){
		'use strict';
        $scope.getData = function () {
            $http.get("/senate/api/user").success(function(data) {
                $scope.users = data.filter(function(item){
                    if (item.role == "Senator" && item.firstName && item.active) {
                        item.present = false;
                        item.marked = false;
                        return item;
                    }
                });
            });
        }
	}])
}());
