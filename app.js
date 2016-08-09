var app = angular.module("calApp", [
	"ui.router",
	"oc.lazyLoad"
	]);

app.config(["$stateProvider", "$urlRouterProvider", function($stateProvider, $urlRouterProvider) {
	$urlRouterProvider.otherwise('/');
	$stateProvider
		.state("logon", {
			url: "/", // browser url
			templateUrl: "views/logon.html", // path to view
			controller: "logonCtrl", // name of controller
            resolve: { // зависимости
                deps: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        insertBefore: '#scriptsInsert',
                        files: [
                            "controllers/logonCtrl.js"
                        ]
                    });
                }]
            }
		})
		.state("main", {
			abstract: true,
            templateUrl: "views/main.html", // path to view
		})

			.state("main.welcome", {
				url: "/welcome", // browser url
				templateUrl: "views/welcome.html", // path to view
				controller: "welcomeCtrl",
	            resolve: { // зависимости
	                deps: ['$ocLazyLoad', function($ocLazyLoad) {
	                    return $ocLazyLoad.load({
	                        insertBefore: '#scriptsInsert',
	                        files: [
	                            "controllers/welcomeCtrl.js"
	                        ]
	                    });
	                }]
	            }
			})
			.state("main.calc", {
				url: "/calculation", // browser url
				templateUrl: "views/calculation.html", // path to view
				controller: "calcCtrl",
	            resolve: { // зависимости
	                deps: ['$ocLazyLoad', function($ocLazyLoad) {
	                    return $ocLazyLoad.load({
	                        insertBefore: '#scriptsInsert',
	                        files: [
	                            "controllers/calcCtrl.js",
	                            "services/FoodDataService.js"
	                        ]
	                    });
	                }]
	            }
			})
			.state("main.about", {
				url: "/about", // browser url
				templateUrl: "views/about.html", // path to view
				controller: "aboutCtrl",
	            resolve: { // зависимости
	                deps: ['$ocLazyLoad', function($ocLazyLoad) {
	                    return $ocLazyLoad.load({
	                        insertBefore: '#scriptsInsert',
	                        files: [
	                            "controllers/aboutCtrl.js"
	                        ]
	                    });
	                }]
	            }
			})
}]);

app.run(["$rootScope","$state", function($rootScope, $state) {

	$rootScope.userData = undefined;

	$rootScope.isNumeric = function(n) {
		return isFinite(parseFloat(n));
	};

	$rootScope.$on('$stateChangeStart', function(e, to, toP, from, fromP) {

		if(from.name === "logon" && typeof $rootScope.userData !== "object") {
			e.preventDefault();
			return;
		}

		if(from.name === "" && to.name !== "logon") {
		   e.preventDefault();
		   $state.go("logon");
		   return;
		}
	});
}]);