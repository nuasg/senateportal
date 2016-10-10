(function(){
	angular.module("senator")
	.controller("SenateDashController",["$scope", "$state", "$http", function($scope, $state, $http){
		'use strict';
		var today = new Date();
		$http.get("/senate/api/document/date/" + today).success(
		function(data) {
			$scope.data = data.map(function(obj){
				obj.weekOf = new Date(obj.weekOf);
				return obj;
			});
		});
		$scope.voteFocus = function (id) {
			$scope.voteId = id;
		}
		$scope.vote = function (value) {
			var req = {
				vote: value,
				documentId: $scope.voteId
			};
			$("#vote").modal("hide");
			$http.get("/senate/api/legislation/" + $scope.voteId).success(function(){
				$http.put("/senate/api/legislation", req).success(function(){
					alert("Thank you for voting");
				}).error(function(value){
					if (value == "Precondition Failed") {
						alert("Voting has expired. Please refresh");
					} else {
						alsert(value);
					}
				})
			}).error(function(){
				$http.post("/senate/api/legislation", req).success(function(){
					alert("Thank you for voting");
				}).error(function(value){
					if (value == "Precondition Failed") {
						alert("Voting has expired. Please refresh");
					} else {
						alsert(value);
					}
				})
			});
		}
	}]);
}());