exports = module.exports = addHelpers;

function addHelpers(app) {
	app.dynamicHelpers({
	    can: function (req, res) {
	        return req.session;
	    }
	});	
}
