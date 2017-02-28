(function(){
	angular.module("senator")
	.controller("AdminDochubController",["$scope", "$http", function($scope, $http){
		'use strict';
        var pullData = function () {
            $http.get("/senate/api/document").success(
            function(data) {
                $scope.data = data.map(function(obj){
                    obj.weekOf = new Date(obj.weekOf);
                    return obj;
                });
            });
        }
        pullData();
		$scope.saveRow = function(row) {
			$http.post("/senate/api/document", row).success(
				function(data) {
					$scope.form = null;
					$("#newDocument").modal('hide');
					$('body').removeClass('modal-open');
					$('.modal-backdrop').remove();
					alert("Document Saved");
                    pullData();
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
			    url: '/senate/api/document',
			    data: req,
			    headers: {'Content-Type': 'application/json;charset=utf-8'}
			}).success(function(){
                pullData();
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
				$http.put("/senate/api/document", data).success(function(){
                    pullData();
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
		$scope.getConfigValues = function () {
			$http.get("/senate/api/docType").success(function(data){
                $scope.types = data.map(function(obj){
                	return obj.type;
                });
            });
		}
		$scope.toggleLive = function(row) {
			row.live = !row.live;
			$http.put("/senate/api/document", row).success(function(){
                pullData();
			});
		}
        $scope.amend = function (row) {
            var save = JSON.parse(JSON.stringify(row));
            delete save["$$hashKey"];
            delete save["__v"];
            delete save["_id"];
			var arr = save.title.split(" ");
			if (arr[0] == "Amendment") {
				if (arr[1] == "to") {
					save.title = "Amendment 2 "
				} else {
					save.title = "Amendment " + (parseInt(arr[1]) + 1)
				}
				save.title += arr.slice(2).join(" ");
			} else {
				save.title = "Amendment to " + save.title;
			}
            $http.post("/senate/api/document", save).success(function(){
                pullData();
            });
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
