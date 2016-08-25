(function(){
	angular.module("senator")
	.controller("SenateDocsController",["$scope", "$state", "$http", function($scope, $state, $http){
		'use strict';
		$http.get("/api/document").success(
		function(data) {
			$scope.data = data.map(function(obj){
				obj.weekOf = new Date(obj.weekOf);
				return obj;
			});
		});
	}]);
}());