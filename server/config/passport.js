// config/passport.js
var LdapStrategy = require('passport-ldapauth');
var userController = require("../controller/user.controller");

module.exports = function(passport) {
	// used to serialize the user for the session
	passport.serializeUser(function(user, done) {
		var sessionUser = user;
		done(null, sessionUser);
	});

	passport.deserializeUser(function(sessionUser, done) {
		done(null, sessionUser);
	});

		// LDAP Authentication
	options = {
		server: {
			url: 'ldaps://registry.northwestern.edu:636',
			bindDn: process.env.LDAP_BIND_DN,
			bindCredentials: process.env.LDAP_BIND_CREDENTIALS,
			searchBase: 'dc=northwestern,dc=edu',
			searchFilter: 'nuIdTag={{username}}'
		}
	};

	passport.use(new LdapStrategy(options, function(user, done){
		var netid = { 
			body: { 
				netid: user.nuIdTag,
				callback: (err, response) => {
					if ((!err && !response)|| err) {
						return done(null, false, { messages: 'Netid not found in Database' });
					} else {
						const request = {};
						const mongoUser = response['_doc'];
						let test = true;
						request.netid = mongoUser.netid;
						if (!mongoUser.email) {
							request.email = user.mail;
							test = false;
						}
						if (!mongoUser.firstName) {
							request.firstName = user.givenName;
							test = false;
						}
						if (!mongoUser.lastName) {
							request.lastName = user.sn;
							test = false;
						}
						if (!test) {
							userController.updateUser({
								body: request,
								callback: (err, final) => {
									return done(null, user);
								}
							});	
						} else {
							return done(null, user);
						}
					}
				}
			} 
		};
		userController.findUser(netid);
	}));
};
