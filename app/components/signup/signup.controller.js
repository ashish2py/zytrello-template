(function(){
	angular.module('app-signup')
		.controller("signupController", function($scope, $http, apiConfig, validator) {
    		//Api parameter
			var api_url_signup = apiConfig.apiServer + apiConfig.apiRegistration; 
			var api_param_username = "username";
			var api_param_password1 = "password1";
			var api_param_password2 = "password2";

			// Form variable
			$scope.username = null;
			$scope.password1 = null;
			$scope.password2 = null;

			//Error
			var error_text = {
				"username_required": "Username is required.",
				"password_required": "Password is required",
				"password_min": "Password must be minimum 6 character",
				"password_not_matching": "Passwords are not matching",
				"retype_password": "Retype password",
				"try_again": "Cant signup. Please try again."

			}

			//Validator
			var validation_rule = {
				"username": {
								"required": error_text.username_required
							},
				"password1": {
								"required": error_text.password_required,
								"min_6": error_text.password_min
							},
				"password2": {
								"required": error_text.retype_password
							},
				"match_pass": {
								"match_password1_password2": error_text.password_not_matching
							}

			}
			var signup_validator = validator.get(validation_rule);

			//Display error
			var _show_error = function(errors){			
				//Parameter and scope variable
				var error_indicator = {
					"username": "errorUsername",
					"password1": "errorPassword1",
					"password2": "errorPassword2",
					"match_pass": "errorPassword2",
					"common": "errorCommon"
				}
				// Showing only frist error per attribute
				for(var var_name in error_indicator){
					$scope[error_indicator[var_name]] = errors.hasOwnProperty(var_name)? errors[var_name][0]: null;
				}
			}

			var _apiSuccessFunction = function(response){
				var token = response.data.key;
				console.log(token);
			}
			var _apiErrorFunction = function(response){
				$scope.errorUsername = $scope.errorPassword1 = $scope.errorPassword2 =null
				//Show error
				$scope.errorCommon = error_text.try_again;
			}

			$scope.performSignUp = function(loginForm){
				//If not vaild return
				var errors = signup_validator.validate($scope)
				if(!angular.equals(errors, {})){
					_show_error(errors);
					return;
				}

				//Do login
				var api_data = {
					"method": "POST",
					"url": api_url_signup,
					"data": {
						"username": $scope.username,
						"password1": $scope.password1,
						"password2": $scope.password2
					}
				};
				$http(api_data).then(_apiSuccessFunction, _apiErrorFunction);
			}
	});
})();