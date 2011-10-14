exports = module.exports = Ability;


function Ability() {

	this.abilities = this.abilities || null;
  this.redirect = this.redirect || true;
  this.role_name = this.role_name || 'role';
  this.redirect_to = this.redirect_to || '/';
  this.redirect_message = this.redirect_message || "Unauthorized";
  this.role = this.role || 'default';


}





Ability.prototype.map_action = function(method) {
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

Ability.prototype.map_target = function(path) {
	target = null;
	// if the path is just /, replace it with index
	target = path.replace(/^\/$/, 'index');
	// remove leading '/'
	target = target.replace(/^[\/]{1}/g, '');
	// replace the rest of '/' with -, to match the setup
	target = target.replace(/\//g, '-');

	return target;
}

Ability.prototype.can = function(action, target) {
  role = this.role || 'default';
	if (abilities[role][target]) {
		for (var i = 0; i< abilities[role][target].length; i++) {
			if (abilities[role][target][i] == action || abilities[role][target] == 'all') {
				return true;
			}
		}		
	}
	return false;
}


Ability.prototype.to = function(action, target) {
  return this.can(action, target);
}

Ability.prototype.can_role = function(req) {
	route = req.route;
	action = this.map_action(route.method);
	target = this.map_target(route.path);

	return this.can(action, target);
}

Ability.prototype.can_ability = function(action, target) {
	return this.can(action, target);
}

