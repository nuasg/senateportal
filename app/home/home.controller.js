(function(){
	angular.module("senator")
	.controller("HomeController",["$scope", "$state", "$http", "DataFactory", function($scope, $state, $http, DataFactory){
		$scope.submit = function(){
			if ($scope.role === "Senator") {
				$state.go("senate");
			} else {
				$state.go("admin");
			}
		}
		$scope.logout = function () {
			$http.post("/senate/logout").success(function(){
				window.location.reload(true);
			});
		}
	}]);
}());