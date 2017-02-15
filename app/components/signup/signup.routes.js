(function(){
	angular.module('app-signup').
		config(function($routeProvider){
			$routeProvider.when("/signup", { 
				templateUrl: "app/components/signup/signup.html",
				controller: "signupController" 
			});
		});
})();