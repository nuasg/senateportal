(function(){
	angular.module("senator")
	.controller("AdminAgendasController",["$scope", "$state", "$http", "$sce", function($scope, $state, $http, $sce){
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
				$scope.getDocs(selected.start_date,selected.end_date);	
			}
		});
		$scope.getDocs = function(start, end){
			var query = "senate/api/document/" + start + "/" + end;
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
		}
		$scope.createIframe = function(item) {
			$scope.linkToDoc = $sce.trustAsResourceUrl(item.link);
		};
		$scope.close = function() {
			$scope.linkToDoc = null;
			$('#docIframe').modal('hide');
			$('body').removeClass('modal-open');
			$('.modal-backdrop').remove();
		}
		$scope.checkAgendaExistence = function(values) {
            for (var i =0; i < values.length; i++){
                if (values[i].type == "Agenda") {
                    return true;
                }
            }
            return false;
		}
		$scope.getAgendaLink = function(values) {
            for (var i =0; i < values.length; i++){
                if (values[i].type == "Agenda") {
                    return values[i].link;
                }
            }
			return null;	
		}
	}])
}());
