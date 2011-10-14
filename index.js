var ability = new (require('./lib/ability'))()
  , helpers = require('./lib/helpers');

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
	helpers(app);
}

authorize = function(action, target, role) {
	req = arguments.callee.caller.arguments[0];
	res = arguments.callee.caller.arguments[1];


	if (req.user) {
		role = req.user[ability.role_name];
	}

	if (role == null) {
		role = 'default';
	}
	// extrapolating everything from the req.route
	if (target == null && action == null) {
		value = ability.can_role(req, role);
	} else {
		// everything is explicitly defined or the user is not using everyauth
		value = ability.can_ability(role, action, target);		
	}

	if (ability.redirect == true && value == false) {
	  res.render = function(view, options, fn) {
  	  req.flash("alert", ability.redirect_message);
  		res.redirect(ability.redirect_to);
	  }
	}

}