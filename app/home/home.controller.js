(function(){
	angular.module("senator")
	.controller("HomeController",["$scope", "$state", "$http", "DataFactory", function($scope, $state, $http, DataFactory){
        $http.get("/senate/api/whoami").success(function(user) {
            if (user.role === "Admin") {
                $state.go("admin");
            } else {
                $state.go("senate");
            }
        });
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
