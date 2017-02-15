(function(){
	angular.module('app-login').
		config(function($routeProvider){
			$routeProvider.when("/login", { 
				templateUrl: "app/components/login/login.html",
				controller: "loginController" 
			});
		});
})();