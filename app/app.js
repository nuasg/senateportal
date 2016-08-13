(function(){
	angular.module("senator",["ui.router","angular.filter"])
		.config(function($stateProvider, $urlRouterProvider){
			$urlRouterProvider.otherwise("/");
			$stateProvider
				.state("home", {
					url: "/",
					templateUrl: "app/home/home.html",
					controller: "HomeController"
				})
				.state("senate", {
					url: "/senate", 
					views: {
						"": {
							templateUrl: "app/senate/senate.html"		
						},
						"agendas@senate": {
							templateUrl: "app/senate/agendas.html"
						},
						"docs@senate": {
							templateUrl: "app/senate/docs.html"
						},
						"polls@senate": {
							templateUrl: "app/senate/polls.html"
						}
					}
				})
				.state("admin", {
					url: "/admin",
					views: {
						"": {
							templateUrl: "app/admin/admin.html"
						},
						"docHub@admin": {
							templateUrl: "app/admin/dochub.html",
							controller: "AdminDochubController"
						},
						"agendas@admin": {
							templateUrl: "app/admin/agendas.html",
							controller: "AdminAgendasController"
						},
						"manage@admin": {
							templateUrl: "app/admin/manage.html",
							controller: "AdminManageController"
						}
					}
				});
		})
}());