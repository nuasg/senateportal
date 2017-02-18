(function(){
	angular.module("senator")
	.controller("AdminAttendenceController",["$scope", "$state", "$http", function($scope, $state, $http){
		'use strict';
        $http.get("/senate/api/user").success(
            function(data) {
                $scope.users = data;
            }
        );
        
	}])
}());
