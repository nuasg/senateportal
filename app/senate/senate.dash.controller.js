(function(){
	angular.module("senator")
	.controller("SenateDashController",["$scope", "$state", "$http", function($scope, $state, $http){
		'use strict';
		var today = new Date();
		$http.get("/api/document/date/" + today).success(
		function(data) {
			$scope.data = data.map(function(obj){
				obj.weekOf = new Date(obj.weekOf);
				return obj;
			});
		});
	}]);
}());