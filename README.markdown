## Ability-js

A simple route-based ACL component for express.js. This won't handle actual authentication, you can use everyauth for that.

## Installing

    npm install ability

## Using this with everyauth:

This assumes you have, in your everyauth setup, a field called "role" (customizable, see below). For example, if you're using facebook:       

```javascript
everyauth.facebook.extractExtraRegistrationParams( function (req) {
  return {
    role: "some default role"
  }
});
```
Obviously this doesn't make much sense without persistence, so you can change the roles, but you can achieve that with mongoose-auth or a custom solution.
    
If you have everyauth working in an expressjs app, all you have to do to your app.js is add the following

```javascript
abilities = {
  editor: {
    index: ['read'],
    protected: ['read']
  },
  default: {
    index: ['read'],
  }
}
var ability = require('ability');
ability.add(abilities);
```

This is route-based, and assumes you're going to have 2 routes, `app.get /protected` and `app.get /`.
**Note**: You must specify a 'default'.

Then, in the route:

```javascript
app.get('/protected', function(req, res) {
  authorize();
  res.render('protected');
});
```

This will check to see if the user is authorized based on the setup above. According to the above setup, an un-authenticated user would not be authorized for this route. 

Optionally, you can specify the action and route:

```javascript
app.get('/protected', function(req, res) {
  authorize('read', 'index');
  res.render('protected');
});
```

Even further, you can specify the role you want to check

```javascript
app.get('/protected', function(req, res) {
  authorize('read', 'index', 'default');
  res.render('protected');
});
```

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
    	role_name: role,
    	redirect_to: '/',
    	redirect_message: 'Unauthorized'
    })

- redirect, whether or not to redirect to the user if they're not authorized. By default, it will redirect a user to the home page if they're not authorized, without a flash. 

- redirect_to, where to redirect the user if authentication fails

- redirect_message, if you're using req.flash, it will put the messages in there

- role_name, the name of the everyauth field for your role (everyauth only)


## Todo:

- Add helpers to be exposed to views
- Add customizeable flash message for redirect
- Flesh out tests more