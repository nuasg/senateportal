(function(){
	angular.module("senator")
	.controller("AdminAttendenceController",["$scope", "$state", "$http", function($scope, $state, $http){
		'use strict';
        var initial = new Date();
        $scope.today = initial.toLocaleDateString();
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
        var getAggregate = function(start, end){
            var query = "senate/api/attendence/aggregate/" + start + "/" + end;
            $http.get(query).success(function(data){
                $scope.quarterAttendence = data;
                $scope.showAttendence = Object.keys(data).length > 0;
            });
        }
        var getQuarter = function(start, end){
            var query = "senate/api/attendence/quarter/" + start + "/" + end;
            $http.get(query).success(function(data){
                console.log(data);
            });
        }
        $scope.getAttendence = function(start, end) {
            getAggregate(start, end);
            getQuarter(start, end);
        }
        $scope.getUsers = function () {
            $http.get("/senate/api/user").success(function(data) {
                $scope.users = data.filter(function(item){
                    if (item.role == "Senator" && item.firstName && item.active) {
                        item.present = false;
                        return item;
                    }
                });
            });
        }
        $scope.saveAttendence = function () {
            $scope.users.forEach(function(obj) {
                $http.post("/senate/api/attendence",{
                    firstName: obj.firstName,
                    lastName: obj.lastName,
                    email: obj.email,
                    present: obj.present,
                    group: obj.group
                });
            });
        }
	}])
}());
