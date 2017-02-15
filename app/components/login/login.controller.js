(function(){
	angular.module('app-login')
		.controller("loginController", function($scope, $http, apiConfig, validator) {
			//Api parameter
			var api_url_login = apiConfig.apiServer + apiConfig.apiLogin; 
			var api_param_username = "username";
			var api_param_password = "password";

			// Form variable
			$scope.username = null;
			$scope.password = null;

			//Error
			var error_text = {
				"username_required": "Username is required.",
				"password_required": "Password is required",
				"invalid_credential": "Invalid Credential"
			}
			
			//Validator
			var validation_rule = {
				"username": {
								"required": error_text.username_required
							},
				"password": {
								"required": error_text.password_required
							}
			}
			var login_validator = validator.get(validation_rule);

			//Display error
			var _show_error = function(errors){			
				//Parameter and scope variable
				var error_indicator = {
					"username": "errorUsername",
					"password": "errorPassword",
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
				$scope.errorUsername = $scope.errorPassword = null;
				//Show error
				$scope.errorCommon = error_text.invalid_credential;
			}

			$scope.performLogin = function(loginForm){
				//If not vaild return
				var errors = login_validator.validate($scope)
				if(!angular.equals(errors, {})){
					_show_error(errors);
					return;
				}

				//Do login
				var api_data = {
					"method": "POST",
					"url": api_url_login,
					"data": {
						"username": $scope.username,
						"password": $scope.password
					}
				};
				$http(api_data).then(_apiSuccessFunction, _apiErrorFunction);
			}
		});
})();