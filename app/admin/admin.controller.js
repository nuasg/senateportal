(function(){
	angular.module("prereqsmap")
	.controller("AdminController",["$scope", "$state", "$http", "$cookies", "DataFactory", function($scope, $state, $http, $cookies, DataFactory){
		'use strict';
		var init = function() {
			$http.get("/api/business")
			.success(function(data) {
				$scope.data = data.map(function(obj){
						obj.weekOf = new Date(obj.weekOf);
						return obj;
				});
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
			$scope.delete = false;
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
					init();
				})
				.error(function(err){
					alert(err);
				});	
		}
	}]);
}());