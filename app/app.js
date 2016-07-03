(function(){
	angular.module("prereqsmap",["ui.router","ngCookies"])
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
					templateUrl: "app/senate/senate.html",
					controller: "SenateController"
				})
				.state("admin", {
					url: "/admin", 
					templateUrl: "app/admin/admin.html",
					controller: "AdminController"
				});
		})
}());