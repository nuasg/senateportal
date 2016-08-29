const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const path = require('path');
const passport = require('passport');
const flash = require('connect-flash');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const morgan = require('morgan');

const app = express();
const userController = require("./server/controller/user.controller");
const documentController = require("./server/controller/document.controller");
const termController = require("./server/controller/term.controller");
// Databases
const promise = require('bluebird');
mongoose.Promise = promise;

const dbURI = process.env.SENATOR_DB;
const options = { server: { socketOptions: { keepAlive: 300000, connectTimeoutMS: 30000 } },  
                replset: { socketOptions: { keepAlive: 300000, connectTimeoutMS : 30000 } }}; 
mongoose.connect(dbURI, options);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

// EJS and Passport Configuration
app.use('/app',express.static(path.join(__dirname, "/app")));
app.set('views', path.join(__dirname, '/app'));
app.set('view engine', 'html');
app.engine('html', require('ejs').renderFile);
app.use(morgan('dev'));
app.use(cookieParser(process.env.SENATOR_SECRET));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({'extended': 'false'}));

// Files
app.use('/node_modules/jquery.min.js',express.static(path.join(__dirname, "/node_modules/jquery/dist/jquery.min.js")));
app.use('/node_modules/bootstrap.js',express.static(path.join(__dirname, "/node_modules/bootstrap/dist/js/bootstrap.js")));
app.use('/node_modules/angular.js',express.static(path.join(__dirname, "/node_modules/angular/angular.js")));
app.use('/node_modules/angular-ui-router.js',express.static(path.join(__dirname, "/node_modules/angular-ui-router/release/angular-ui-router.js")));
app.use('/node_modules/angular-filter.js',express.static(path.join(__dirname, "node_modules/angular-filter/dist/angular-filter.js")));

app.use(session({
    secret: process.env.SENATOR_SECRET,
    name: 'asg-senate',
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({ 
        mongooseConnection: mongoose.connection,
        ttl: 14 * 24 * 60 * 60
    })
}));
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session
require('./server/config/passport')(passport);

// Middleware
const checkCookie = (req, res, next) => {
	if (req.session.passport) {
		next();
	} else {
		res.sendStatus(500);
	}
}

const adminAccess = (req, res, next) => {
	userController.findUser({
		body: {
			netid: req.session.passport.user.uid,
			success: (user) => {
				if (user.role === "Admin") {
					next();	
				} else {
					res.sendStatus(500);
				}
			},
			failure: () => {
				res.sendStatus(500);
			}
		}
	});
}
// routing
require('./routes.js')(app, passport);

app.get('/workaround', function(req,res){
    res.sendFile(path.join(__dirname,"app/index.html"));
});

// Backend API Routes
app.get("/api/document/:id", checkCookie, documentController.getDocumentId);
app.get("/api/document/date/:date", checkCookie, documentController.getDocumentByWeek);
app.post("/api/document", checkCookie, adminAccess, documentController.addDocument);
app.get("/api/document", checkCookie, documentController.findAllDocuments);
app.delete("/api/document", checkCookie, adminAccess, documentController.deleteDocument);
app.put("/api/document", checkCookie, adminAccess, documentController.updateDocument);
app.get("/api/document/:start/:end", checkCookie, documentController.getdocumentByDateRange);
// Users
// app.get("/api/user", userController.authenticate, userController.getAllUsers);
app.post("/api/user", checkCookie, adminAccess, userController.addUser);
app.get("/api/user", checkCookie, userController.getUsers);
app.put("/api/user", checkCookie, adminAccess, userController.updateUser);
app.delete("/api/user",checkCookie, adminAccess, userController.deleteUser);
// Terms
app.get("/api/terms/:date", checkCookie, termController.getTerms);

app.listen("5004");
