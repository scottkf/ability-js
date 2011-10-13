var ability = require('./lib/ability')
  , helpers = require('./lib/helpers');

exports = module.exports = createAbilities;

function createAbilities(abilities) {
	ability.abilities = abilities;
	this.redirect = true;
	this.role_name = 'role';
	this.redirect_to = '/'
	return this;
}

exports.add = function (schema) {
	createAbilities(schema);

}

exports.configure = function(options) {
	for (var i in options) {
		this[i] = options[i];
		// console.log(this);
	}
}
exports.addHelpers = function(app) {
	helpers(app);
}

authorize = function(action, target, role) {
	req = arguments.callee.caller.arguments[0];
	res = arguments.callee.caller.arguments[1];


	if (role == null) {
		role = 'default';
	}
	if (req.user) {
		role = req.user[role_name];
	}
	// extrapolating everything from the req.route
	if (target == null && action == null) {
		value = ability.can_role(req, role);
	} else {
		// everything is explicitly defined or the user is not using everyauth
		value = ability.can_ability(role, action, target);		
	}


	if (createAbilities.redirect == true && value == false) {
		res.redirect(createAbilities.redirect_to); 
	}
	return !value;

}