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
					controller: "HomeController",
					views: {
						"": {
							templateUrl: "app/senate/senate.html",
							controller: "HomeController"
						},
						"dash@senate": {
							templateUrl: "app/senate/dash.html",
							controller: "SenateDashController"
						},
						"docs@senate": {
							templateUrl: "app/senate/docs.html",
							controller: "SenateDocsController"
						},
						"polls@senate": {
							templateUrl: "app/senate/polls.html",
							controller: "SenateDashController"
						},
						"results@senate": {
							templateUrl: "app/senate/results.html",
							controller: "SenateDocsController"
						},
						"sub@senate": {
							templateUrl: "app/senate/sub.html",
							controller: "SenateSubController"
						}
					}
				})
				.state("admin", {
					url: "/admin",
					views: {
						"": {
							templateUrl: "app/admin/admin.html",
							controller: "HomeController"
						},
						"results@admin": {
							templateUrl: "app/senate/results.html",
							controller: "SenateDocsController"
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
						},
						"configure@admin": {
							templateUrl: "app/admin/configure.html",
							controller: "AdminConfigureController"
						},
                        "attendence@admin": {
                            templateUrl: "app/admin/attendence.html",
                            controller: "AdminAttendenceController"
                        }
					}
				});
		})
}());
