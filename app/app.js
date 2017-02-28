(function(){
	angular.module("senator",["ui.router","angular.filter"])
		.config(function($stateProvider, $urlRouterProvider){
			$urlRouterProvider.otherwise("/");
			$stateProvider
				.state("home", {
					url: "/",
					templateUrl: "senate/app/home/home.html",
					controller: "HomeController"
				})
				.state("senate", {
					url: "/senate",
					views: {
						"": {
							templateUrl: "senate/app/senate/senate.html",
							controller: "HomeController"
						},
						"dash@senate": {
							templateUrl: "senate/app/senate/dash.html",
							controller: "SenateDashController"
						},
						"docs@senate": {
							templateUrl: "senate/app/senate/docs.html",
							controller: "SenateDocsController"
						},
						"polls@senate": {
							templateUrl: "senate/app/senate/polls.html",
							controller: "SenateDashController"
						},
						"results@senate": {
							templateUrl: "senate/app/senate/results.html",
							controller: "SenateDocsController"
						},
						"sub@senate": {
							templateUrl: "senate/app/senate/sub.html",
							controller: "SenateSubController"
						}
					}
				})
				.state("admin", {
					url: "/admin",
					views: {
						"": {
							templateUrl: "senate/app/admin/admin.html",
							controller: "HomeController"
						},
						"results@admin": {
							templateUrl: "senate/app/senate/results.html",
							controller: "SenateDocsController"
						},
						"docHub@admin": {
							templateUrl: "senate/app/admin/dochub.html",
							controller: "AdminDochubController"
						},
						"agendas@admin": {
							templateUrl: "senate/app/admin/agendas.html",
							controller: "AdminAgendasController"
						},
						"manage@admin": {
							templateUrl: "senate/app/admin/manage.html",
							controller: "AdminManageController"
						},
						"configure@admin": {
							templateUrl: "senate/app/admin/configure.html",
							controller: "AdminConfigureController"
						},
                        "attendence@admin": {
                            templateUrl: "senate/app/admin/attendence.html",
                            controller: "AdminAttendenceController"
                        }
					}
				});
		})
}());
