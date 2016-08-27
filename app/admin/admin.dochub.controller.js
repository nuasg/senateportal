(function(){
	angular.module("senator")
	.controller("AdminDochubController",["$scope", "$state", "$http", function($scope, $state, $http){
		'use strict';
		$http.get("/api/document").success(
		function(data) {
			$scope.data = data.map(function(obj){
				obj.weekOf = new Date(obj.weekOf);
				return obj;
			});
		});
		$scope.saveRow = function(row) {
			$http.post("/api/document", row).success(
				function(data) {
					$scope.form = null;
					$("#newDocument").modal('hide');
					$('body').removeClass('modal-open');
					$('.modal-backdrop').remove();
					alert("Document Saved");
					$state.reload('admin');
				}
			).error(alert);
		}
		$scope.deleteFocus = function (row) {
			$scope.deletion = row;
		}
		$scope.confirmDelete = function (data) {
			$('#deleteDocument').modal('hide');
			$('body').removeClass('modal-open');
			$('.modal-backdrop').remove();
			var req = {
				_id: data._id
			};
			$http({
			    method: 'DELETE',
			    url: '/api/document',
			    data: req,
			    headers: {'Content-Type': 'application/json;charset=utf-8'}
			}).success(function(){
				$state.reload('admin');
			}).error(alert);
		}
		$scope.editFocus = function (row) {
			$scope.form = JSON.parse(JSON.stringify(row));
			$scope.form.weekOf = new Date($scope.form.weekOf);
			delete $scope.form.$$hashKey;
			$scope.edit = true;
		}
		$scope.saveEdit = function (data) {
			var keys = Object.keys(data);
			var test = true;
			$('.modal').modal('hide');
			$('body').removeClass('modal-open');
			$('.modal-backdrop').remove();
			for (var i=0; i<keys.length; i++) {
				var value = data[keys[i]];
				if (value === null || value === "") {
					test = false;
				}
			}
			if (test) {
				$http.put("/api/document", data).success(function(){
					$state.reload('admin');
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
	angular.module("senator")
		.filter( 'domain', function () {
			return function ( input ) {
				var matches,
				output = "",
				urls = /\w+:\/\/([\w|\.]+)/;

				matches = urls.exec( input );

				if ( matches !== null ) output = matches[1];

				return output;
			};
		});
}());