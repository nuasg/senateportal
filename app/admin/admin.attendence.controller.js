(function(){
	angular.module("senator")
	.controller("AdminAttendenceController",["$scope", "$state", "$http", function($scope, $state, $http){
		'use strict';
        var initial = new Date();
        $http.get("senate/api/terms/" + initial).success(function(data){
            var selected = null;
            data.forEach(function(obj){
                obj.end_date = new Date(obj.end_date);
                obj.start_date = new Date(obj.start_date);
                if (obj.start_date <= initial && obj.end_date >= initial) {
                    selected = obj;
                }
            });
            $scope.dates = {
                data,
                selected
            }
            if (selected) {
                $scope.getAttendence(selected.start_date,selected.end_date);  
            }
        });
        $scope.getAttendence = function(start, end){
            var query = "senate/api/attendence/" + start + "/" + end;
            $http.get(query).success(function(data){
                console.log(data);
            });
        }
        $scope.getUsers = function () {
            $http.get("/senate/api/user").success(function(data) {
                $scope.users = data.filter(function(item){
                    if (item.role == "Senator" && item.firstName && item.active) {
                        item.present = false;
                        item.marked = false;
                        return item;
                    }
                });
            });
        }
	}])
}());
