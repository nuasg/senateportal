module.exports = function(app, passport) {
//// VIEWS ---------------------------------------------------------------------
	// home page
	app.get('/', function(req, res) {
		if (req.user) {
			res.render('index.html', {
				user: req.user
			});
		} else {
			res.render('login.html', {
				messages: null || req.flash('error')
			});
		}
	});

	app.post('/login', passport.authenticate('ldapauth', {
		successRedirect: '/',
		failureRedirect: '/',
		failureFlash: true
	}), function(req, res) {
		res.send({status: 'ok'});
	});

	app.post('/logout', function(req, res) {
		req.session.destroy();
		req.logout();
		res.redirect('/');
	});
};
