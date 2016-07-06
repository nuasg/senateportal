var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

var app = express();
var authenticationController = require("./server/controller/authentication.controller");
var businessController = require("./server/controller/business.controller");

mongoose.connect("mongodb://node:node@ds053784.mongolab.com:53784/prereqsmap");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use('/app',express.static(__dirname + "/app"));
app.use('/node_modules',express.static(__dirname + "/node_modules"));
app.get('/graph.json', function(req,res){
	res.sendFile(__dirname + "/app/profile/graph.json");
});
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


app.listen('3000', function(){
	console.log("Listening on port 3000...");
});