angular.module('app')
	.config(function($routeProvider, $locationProvider){
		
		// Urls
		$routeProvider.when("/", { 
			templateUrl: "app/components/login/login.html",
			controller: "loginController"
		});
		
		$locationProvider.html5Mode({
  			enabled: true,
  			requireBase: false
		});

});

