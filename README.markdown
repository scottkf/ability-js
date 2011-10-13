## Ability-js

A simple route-based ACL component for express.js. This won't handle actual authentication, you can use everyauth for that.

## Installing

    npm install ability

## Using this with everyauth:

1. This assumes you have, in your everyauth setup, a field called "role" (customizable, see below). For example, if you're using facebook:

    everyauth.facebook.extractExtraRegistrationParams( function (req) {
		return {
	  	  role: "some default role"
	  	}
	});
Obviously this doesn't make much sense without persistence, so you can change the roles, but you can achieve that with mongoose-auth or a custom solution.
    
2. If you have everyauth working in an expressjs app, all you have to do to your app.js is add the following

    abilities = {
	  editor: {
	    index: ['read'],
	    protected: ['read']
	  },
	  default: {
	    index: ['read'],
	  }
	}
	var ability = require('./lib/ability-js');
	ability.add(abilities);
	This is route-based, and assumes you're going to have 2 routes, `app.get /protected` and `app.get /`.
	**Note**: You must specify a 'default'.

3. Then, in the route:

    app.get('/protected', function(req, res) {
	  authorize() || res.render('protected');
	});
This will check to see if the user is authorized based on the setup above. According to the above setup, an un-authenticated user would not be authorized for this route. 


###Route translations:

On the routes, you may specify one of 4 options, 'read', 'write', 'delete', or 'all'. 

1. Read -> Get
2. Write -> Put/post
3. Delete -> Delete
4. All -> Read/Write/Delete
	

## Options
	
	ability = require('ability');
    ability.configure({
    	redirect: true,
    	role_name: role
    })

- redirect, whether or not to redirect to the user if they're not authorized. By default, it will redirect a user to the home page if they're not authorized, without a flash    

- role_name, the name of the everyauth field for your role (everyauth only)


## Todo:

- Add helpers to be exposed to views
- Add customizeable flash message for redirect
- Fix this:
      authorize() || res.render('protected');
  So it can be written as:
      authorize()
      res.render('protected')
  Calling res.end() directly after res.redirect, and then res.render causes an error
- Flesh out tests more