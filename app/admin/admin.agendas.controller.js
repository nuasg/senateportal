(function(){
	angular.module("senator")
	.controller("AdminAgendasController",["$scope", "$state", "$http", function($scope, $state, $http){
		'use strict';
		$http.get("api/document").success(function(data){
			
		});
	}]);
}());