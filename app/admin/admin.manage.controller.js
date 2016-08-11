(function(){
	angular.module("senator")
	.controller("AdminManageController",["$scope", "$state", "$http", function($scope, $state, $http){
		'use strict';
		var getData = function () {
			$http.get("/api/user").success(
				function(data) {
					$scope.users = data;
				}
			);
		}
		getData();
		$scope.saveRow = function(row) {
			$http.post("/api/user", row).success(
				function(data) {
					$scope.form = null;
					$("#newUser").modal('hide');
					alert("User Saved");
					getData();
				}
			).error(alert);
		}
		$scope.deleteFocus = function (row) {
			$scope.deletion = row;
		}
		$scope.confirmDelete = function (data) {
			$('#deleteUser').modal('hide');
			var req = {
				_id: data._id
			};
			$http({
			    method: 'DELETE',
			    url: '/api/user',
			    data: req,
			    headers: {'Content-Type': 'application/json;charset=utf-8'}
			}).success(getData).error(alert);
		}
		$scope.editFocus = function (row) {
			$scope.form = JSON.parse(JSON.stringify(row));
			delete $scope.form.$$hashKey;
			$scope.edit = true;
		}
		$scope.saveEdit = function (data) {
			var keys = Object.keys(data);
			var test = true;
			$('.modal').modal('hide')
			for (var i=0; i<keys.length; i++) {
				var value = data[keys[i]];
				if (value === null || value === "") {
					test = false;
				}
			}
			if (test) {
				$http.put("/api/user", data).success(function(){
					getData();
					$scope.edit = false;
				}).error(alert);
			} else {
				alert("Fill out all fields!");
			}
		}
		$scope.clearRow = function () {
			$scope.edit = false;
			$scope.form	= null;
		}
	}]);
}());