var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var path = require('path');
var passport = require('passport');
var flash = require('connect-flash');
var session = require('express-session');
var morgan = require('morgan');

var app = express();
var userController = require("./server/controller/user.controller");
var businessController = require("./server/controller/business.controller");

mongoose.connect("mongodb://senator:senator@ds015995.mlab.com:15995/senator");

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
app.use(cookieParser(process.env.SECRET));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({'extended': 'false'}));

// Files
app.use('/node_modules/jquery.min.js',express.static(path.join(__dirname, "/node_modules/jquery/dist/jquery.min.js")));
app.use('/node_modules/bootstrap.js',express.static(path.join(__dirname, "/node_modules/bootstrap/dist/js/bootstrap.js")));
app.use('/node_modules/angular.js',express.static(path.join(__dirname, "/node_modules/angular/angular.js")));
app.use('/node_modules/angular-ui-router.js',express.static(path.join(__dirname, "/node_modules/angular-ui-router/release/angular-ui-router.js")));

app.use(session({secret: process.env.SECRET}));
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session
require('./server/config/passport')(passport);

// routing
require('./routes.js')(app, passport);

app.get('/workaround', function(req,res){
	res.sendFile(path.join(__dirname,"app/index.html"));
});

// Backend API Routes
app.get("/api/business/:id", businessController.getBusinessId);
app.get("/api/business/date/:date", businessController.getBusinessByWeek);
app.post("/api/business", businessController.addbusiness);
app.get("/api/business", businessController.findAllBusiness);
app.delete("/api/business", businessController.deleteBusiness);
app.put("/api/business", businessController.updateBusiness);
// Users
// app.get("/api/user", userController.authenticate, userController.getAllUsers);
app.post("/api/user", userController.addUser);
app.get("/api/user", userController.getUsers);
app.put("/api/user", userController.updateUser);

app.listen('3000', function(){
	console.log("Listening on port 3000...");
});
