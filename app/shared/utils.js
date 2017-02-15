(function() {

    // Validator Module
    angular.module('validator', [])
        .service("validator", function() {
            var serviceValidator = this;

            //Valid rules
            valid_rules = ['required', 'match', 'min'];

            //Cant be null or empty
            this.validate_required = function(object, var_name) {
                return object[var_name] != null && object[var_name].trim() != '';
            }

            //All must have same value
            this.validate_match = function(object, variable, var_name) {
                var value = null;
                for (var i = 0; i < variable.length; i++) {
                    if (value == null) {
                        value = object[variable[i]];
                    } else if (value !== object[variable[i]]) {
                        return false;
                    }
                }
                return true;
            }

            //Min size
            this.validate_min = function(object, size, var_name) {
                var size = size[0];
                var value = object[var_name];
                //If null return true (it can be optional)
                if (value == null) {
                    return true;
                }
                // Validate
                if (typeof value == "string") {
                    return value.length >= size;
                } else if (typeof value == "number") {
                    return value >= size;
                }
                return false;
            }

            var validator = {};
            validator.validate = function(validation_rules, object) {
                var errors = {}

                //Vaidate each property
                for (var var_name in validation_rules) {
                    var rules = validation_rules[var_name];

                    for (var rule in rules) {
                        /*
                         *	Check if rule is complex rule eg:- "match_pass1_pass2"
                         * 			if complex then break rule and call appropriate method.
                         * 	Else if simple rule:
                         * 		then call validate for that rule.
                         */
                        var is_valid = false;
                        if (rule.indexOf('_') > -1) {
                            var tokens = rule.split('_');

                            if (valid_rules.indexOf(tokens[0]) == -1) {
                                throw TypeError("'" + tokens[0] + "' is not vaild rule");
                            }
                            var func_name = "validate_" + tokens[0];
                            is_valid = serviceValidator[func_name](object, tokens.splice(1), var_name);
                        } else {
                            if (valid_rules.indexOf(rule) == -1) {
                                throw TypeError("'" + rule + "' is not vaild rule for '" + var_name + "'");
                            }
                            var func_name = "validate_" + rule;
                            is_valid = serviceValidator[func_name](object, var_name);
                        }

                        // Add error
                        if (!is_valid) {
                            if (!errors.hasOwnProperty(var_name)) {
                                errors[var_name] = [rules[rule]];
                            } else {
                                errors[var_name].push(rules[rule]);
                            }

                        }
                    }
                }
                return errors;
            };
            return validator;
            
        });
})();
