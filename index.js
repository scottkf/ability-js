var ability = new (require('./lib/ability'))();
  // , helpers = require('./lib/helpers');

exports = module.exports = createAbilities;

function createAbilities(abilities) {
	ability.abilities = abilities;
  return exports;
}

exports.add = function (schema) {
	createAbilities(schema);
}

exports.configure = function(options) {
	for (var i in options) {
		ability[i] = options[i];
		// console.log(this);
	}
}
exports.addHelpers = function(app) {
	app.dynamicHelpers({
	    able: function (req, res) {
      	if (req.user) {
      		ability.role = req.user[ability.role_name];
      	}
        return ability;
	    }
	});
}

authorize = function(action, target, role) {
	req = arguments.callee.caller.arguments[0];
	res = arguments.callee.caller.arguments[1];


	if (req.user) {
		ability.role = req.user[ability.role_name];
	}
	if (role) {
	  ability.role = role;
	}

	// extrapolating everything from the req.route
	if (target == null && action == null) {
		value = ability.can_role(req);
	} else {
		// everything is explicitly defined or the user is not using everyauth
		value = ability.can_ability(action, target);		
	}

	if (ability.redirect == true && value == false) {
	  res.render = function(view, options, fn) {
  	  req.flash("alert", ability.redirect_message);
  		res.redirect(ability.redirect_to);
	  }
	}

}