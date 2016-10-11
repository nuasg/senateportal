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
			url: process.env.LDAP_URL,
			bindDn: process.env.LDAP_BIND_DN,
			bindCredentials: process.env.LDAP_BIND_CREDENTIALS,
			searchBase: process.env.LDAP_BASE,
			searchFilter: process.env.LDAP_FILTER
		}
	};

	passport.use(new LdapStrategy(options, function(user, done){
		var netid = { 
			body: { 
				netid: user.nuIdTag,
				success: (response) => {
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
							callback: () => {
								return done(null, user);
							}
						});	
					} else {
						return done(null, user);
					}
				},
				failure: (err) => {
					return done(null, false, { messages: 'Netid not found in Database' });
				}
			} 
		};
		userController.findUser(netid);
	}));
};
