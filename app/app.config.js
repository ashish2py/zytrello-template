(function(){
	angular.module('app-config', [])
		.constant("apiConfig",{
			"apiServer" : "http://localhost:8000/",
			"apiLogin" : "rest-auth/login/",
			"apiRegistration": "rest-auth/registration/"
		});	
})();
