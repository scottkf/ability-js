exports = module.exports = Ability;


function Ability(ability) {

	this.abilities = ability;

	return this;
}



map_action = function(method) {
	action = null
	if (method == "get") {
		action = 'read';
	} else if (method == "put" || method == "post"){
		action = 'write';
	} else if (method == "delete") {
		action = 'delete';
	}
	return action;
}

map_target = function(path) {
	target = null;
	// if the path is just /, replace it with index
	target = path.replace(/^\//$, 'index');
	// remove leading '/'
	target = target.replace(/^[\/]{1}/g, '');
	// replace the rest of '/' with -, to match the setup
	target = target.replace(/\//g, '-');

	return target;
}

can = function(role, action, target) {
	if (abilities[role][target]) {
		for (var i = 0; i< abilities[role][target].length; i++) {
			if (abilities[role][target][i] == action || abilities[role][target] == 'all') {
				return true;
			}
		}		
	}
	return false;
}

exports.can_role = function(req, role) {
	route = req.route;
	action = map_action(route.method);
	target = map_target(route.path);

	return can(role, action, target);
}

exports.can_ability = function(role, action, target) {
	return can(role, action, target);
}