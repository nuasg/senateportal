(function(){
	angular.module("senator")
	.controller("HomeController",["$scope", "$state", "$http", "$cookies", "DataFactory", function($scope, $state, $http, $cookies, DataFactory){
		$scope.submit = function(){
			if ($scope.role === "Senator") {
				$state.go("senate");
			} else {
				$state.go("admin");
			}
		}
	}]);
}());