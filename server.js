var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

var app = express();
var authenticationController = require("./server/controller/authentication.controller");
var businessController = require("./server/controller/business.controller");

mongoose.connect("mongodb://senator:senator@ds015995.mlab.com:15995/senator");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use('/app',express.static(__dirname + "/app"));
app.use('/node_modules/jquery.min.js',express.static(__dirname + "/node_modules/jquery/dist/jquery.min.js"));
app.use('/node_modules/bootstrap.js',express.static(__dirname + "/node_modules/bootstrap/dist/js/bootstrap.js"));
app.use('/node_modules/angular.js',express.static(__dirname + "/node_modules/angular/angular.js"));
app.use('/node_modules/angular-ui-router.js',express.static(__dirname + "/node_modules/angular-ui-router/release/angular-ui-router.js"));
app.use('/node_modules/angular-cookies.js',express.static(__dirname + "/node_modules/angular-cookies/angular-cookies.js"));
app.get('/', function(req,res){
	res.sendFile(__dirname + "/index.html");
});
// Authentication
app.post("/api/user/signup", authenticationController.signup);

// Business
app.get("/api/business/:id", businessController.getBusinessId);
app.get("/api/business/date/:date", businessController.getBusinessByWeek);
app.post("/api/business", businessController.addbusiness);
app.get("/api/business", businessController.findAllBusiness);
app.delete("/api/business", businessController.deleteBusiness);
app.put("/api/business", businessController.updateBusiness);
// Senate

app.listen('3000', function(){
	console.log("Listening on port 3000...");
});