(function(){
	angular.module("senator")
	.controller("HomeController",["$scope", "$state", "$http", "$cookies", "DataFactory", function($scope, $state, $http, $cookies, DataFactory){
		$scope.submit = function(){
			if ($scope.role === "Senator") {
				$state.go("senate");
			} else {
				$state.go("admin");
			}
			// FB.login(function(response){
			// 	if (response.status === 'connected') {
	  //       document.getElementById('status').innerHTML = 'We are logged in';
	  //       console.log("YES");
	  //     } else if (response.status === 'not_authorized') {
	  //       document.getElementById('status').innerHTML = 'Please log into this app.';
	  //     } else {
	  //       document.getElementById('status').innerHTML = 'Please log into Facebook.';
	  //     }
			// });
		}
	}]);
}());