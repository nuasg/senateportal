(function(){
	angular.module("senator")
	.controller("SenateDashController",["$scope", "$state", "$http", function($scope, $state, $http){
		'use strict';
		var today = new Date();

		var getDocs = function(){
			$http.get("/senate/api/document/date/" + today).
				success(function(data) {
					$scope.data = data.map(function(obj){
						obj.weekOf = new Date(obj.weekOf);
						return obj;
					});
				}
			);
		}
		getDocs();
		// Live pull every 15 seconds
		var pullDocs = window.setInterval(getDocs, 15000);

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
                    $state.reload('senate');
					alert("Your vote has been changed");
				}).error(function(value){
					if (value == "Precondition Failed") {
						alert("Voting has expired. Please refresh");
					} else {
						alsert(value);
					}
				})
			}).error(function(){
				$http.post("/senate/api/legislation", req).success(function(){
                    $state.reload('senate');
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
