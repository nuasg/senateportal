(function(){
	angular.module("senator")
	.controller("AdminManageController",["$scope", "$state", "$http", function($scope, $state, $http){
		'use strict';
		var getData = function () {
			$http.get("/senate/api/user").success(
				function(data) {
					$scope.users = data;
				}
			);
		}
		getData();
		$scope.saveRow = function(row) {
			$http.post("/senate/api/user", row).success(
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
			    url: '/senate/api/user',
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
				$http.put("/senate/api/user", data).success(function(){
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
		$scope.sub = function (row) {
			$scope.selectedRow = row;
			$http.get("/senate/api/user/sub/" + row.netid).success(function(data){
				if (data !== null) {
					$("#sub").modal('hide');
					$('body').removeClass('modal-open');
					$('.modal-backdrop').remove();
					alert("There is already a sub!");
				}
			})
		}
		$scope.addSub = function (subNetid) {
			$http.post("/senate/api/user/sub", {
                "subNetid": subNetid,
                "senatorNetid": $scope.selectedRow.netid,
                "group": $scope.selectedRow.group
            }).success(function(data){
				$("#sub").modal('hide');
				$('body').removeClass('modal-open');
				$('.modal-backdrop').remove();
                getData();
				alert("Added Sub");
            });
		}
		$scope.relieve = function (row) {
			$http.get("/senate/api/user/sub/" + row.netid).success(function(data){
				if (data !== null) {
					$http.post("/senate/api/user/sub/relieve",{
						"subNetid": data.netid,
						"senatorNetid": row.netid
					}).success(function(data){
						alert("Relieved Sub of duties");
						getData();
					});
				} else {
					alert("Selected person is not a sub");
				}
			});
		}
	}]);
}());