var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var path = require('path');
var passport = require('passport');
var flash = require('connect-flash');
var session = require('express-session');

var app = express();
var userController = require("./server/controller/user.controller");
var businessController = require("./server/controller/business.controller");

mongoose.connect("mongodb://senator:senator@ds015995.mlab.com:15995/senator");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use('/app', express.static(path.join(__dirname, "/dist")));
app.get('/', function(req,res){
	res.sendFile( path.join(__dirname, "./dist/index.html"));
});

// Business
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
app.get("/api/user", userController.updateUser);

app.listen('3000', function(){
	console.log("Listening on port 3000...");
});
