(function(){
	angular.module("senator")
	.controller("AdminAgendasController",["$scope", "$state", "$http", "$sce", function($scope, $state, $http, $sce){
		'use strict';
		var start = new Date();
		var end = new Date(2017, 1, 10);
		var query = "api/document/" + start + "/" + end;
		var months = {
			1:'January',
			2:'February',
			3:'March',
			4:'April',
			5:'May',
			6:'June',
			7:'July',
			8:'August',
			9:'September',
			10:'October',
			11:'November',
			12:'December',
		};
		$http.get(query).success(function(data){
			data.forEach(function(item){
				var tempMonth = new Date(item.month);
				var tempDay = new Date(item.day);
				item.stringMonth = months[tempMonth.getMonth() + 1];
				item.day = tempDay.getDate();
				item.weekOf = new Date(item.weekOf);
			});
			$scope.items = data;
		});

		$scope.createIframe = function(item) {
			$scope.linkToDoc = $sce.trustAsResourceUrl(item.link);
		};
		$scope.close = function() {
			$scope.linkToDoc = null;
			$('#docIframe').modal('hide');
			$('body').removeClass('modal-open');
			$('.modal-backdrop').remove();
		}
	}])
}());