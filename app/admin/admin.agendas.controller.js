(function(){
	angular.module("senator")
	.controller("AdminAgendasController",["$scope", "$state", "$http", "$cookies", "DataFactory", function($scope, $state, $http, $cookies, DataFactory){
		'use strict';
		var init = function() {
			$http.get("/api/business")
			.success(function(data) {
				$scope.data = data.map(function(obj){
					obj.weekOf = new Date(obj.weekOf);
					return obj;
				});
			});
			$http.get("/api/user")
			.success(function(data) {
				$scope.users = data;
			});
		}
		init();
		$scope.compareDates = function(chartTime) {
			var today = new Date();
			chartTime = new Date(chartTime);
			chartTime.setHours(0,0,0,0);
			chartTime.setDate(chartTime.getDate() + 1);
			return today < chartTime;
		}
		$scope.editFocus = function (row) {
			$scope.modal = JSON.parse(JSON.stringify(row));
			$scope.modal.weekOf = new Date($scope.modal.weekOf);
			delete $scope.modal.$$hashKey;
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
				$http.put("/api/business", data)
					.success(function(succ) {
						init();
					})
					.error(function(err){
						alert(err);
					});	
			} else {
				alert("Fill out all fields!");
			}
		}
		$scope.deleteFocus = function (row) {
			$scope.modal = row;	
			$scope.delete = true;
		}
		$scope.confirmDelete = function (data) {
			$('.modal').modal('hide');
			var req = {
				_id: data._id
			};
			$http({
			    method: 'DELETE',
			    url: '/api/business',
			    data: req,
			    headers: {'Content-Type': 'application/json;charset=utf-8'}
			}).success(function(succ){
					$scope.delete = false;
					init();
				})
				.error(function(err){
					alert(err);
				});	
		}
		$scope.deleteClose = function () {
			$scope.delete = false;
		}
		$scope.saveNew = function (data, name) {
			if (name === "user") {
				var url = "/api/user";
			} else if (name === "business") {
				var url = "/api/business";
			}
			$http.post(url, data)
				.success(function(succ){
					init();
					if (name === "user") {
						alert("User Saved!");
					} else if (name === "business") {
						alert("Legislation Saved");	
					}
				})
				.error(function(err){
					alert(err);
				});
		}
		$scope.clear = function () {
			$scope.form = null;
			$scope.manage = null;
		}
		$scope.edit = function (row) {
			$scope.editUser = true;
			$scope.manage = row;
		}
	}]);
}());