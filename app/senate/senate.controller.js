(function(){
	angular.module("senator")
	.controller("SenateController",["$scope", "$state", "$http", "$cookies", "DataFactory", function($scope, $state, $http, $cookies, DataFactory){
		$scope.loadSchools = function(){
			$scope.schools = [];
			$http.get("/majors.json").success(function(data){
				$scope.major_data = data;
				data.forEach(function(lambda){
					$scope.schools.push(lambda.name);
				});
			})
		}
		$scope.selectSchool = function(school) {
			// $http.get("/api/school/" + school).success(function(data){
			// 	$scope.majors = data[0].majors;
			// });
			$scope.majors = []
			$scope.major_data.forEach(function(lambda){
				if (lambda.name == school) {
					lambda.subjects.forEach(function(subject){
						$scope.majors.push(subject.name);
					});
				}
			})
		}
		$scope.selectMajor = function(school,major){
			DataFactory.query = {
				school: school,
				major: major
			}
			$cookies.putObject("query",DataFactory.query);
			$state.go("graph");
		}
		$scope.login = function(){
			
		}
	}]);
}());