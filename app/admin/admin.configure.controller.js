(function(){
	angular.module("senator")
	.controller("AdminConfigureController",["$scope", "$state", "$http", function($scope, $state, $http){
		'use strict';
        var getTypeData = function () {
    		$http.get("/senate/api/docType").success(function(data){
                $scope.types = data;
            });
        }
        getTypeData();
        $scope.addType = function (newType) {
            $http.post("/senate/api/docType", {"type": newType}).success(function(data){
                getTypeData();
                $scope.type_value = "";
                $("#addType").modal('hide');
            });
        }
        $scope.editFocus = function (value, id) {
            $scope.type_value = value;
            $scope.type_id = id;
        }
        $scope.editType = function (value, id) {
            $http.put("/senate/api/docType", {"type": value, "_id": id}).success(function(data){
                getTypeData();
                $scope.type_value = null;
                $scope.type_id = null;
                $("#editType").modal("hide");
            })
        }
        $scope.deleteType = function (id) {
            $http({
                method: 'DELETE',
                url: '/senate/api/docType',
                data: {_id: id},
                headers: {'Content-Type': 'application/json;charset=utf-8'}
            }).success(getTypeData).error(alert);
        }
	}])
}());