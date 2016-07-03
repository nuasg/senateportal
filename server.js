var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

var app = express();
var authenticationController = require("./server/controller/authentication.controller");
var majorController = require("./server/controller/major.controller");
var schoolController = require("./server/controller/school.controller");

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
app.get('/majors.json',function(req,res){
	res.sendFile(__dirname + "/server/majors.json");
})
// Authentication
app.post("/api/user/signup", authenticationController.signup);

// Major
app.get("/api/major", majorController.findAllMajors);
app.get("/api/major/:major_name", majorController.findByMajor);
app.post("/api/major", majorController.createMajor);

//School
app.get("/api/school", schoolController.findSchools);
app.get("/api/school/:school_name", schoolController.findBySchool);
// app.put("/api/school/:school_name", schoolController.updateSchool);

app.listen('3000', function(){
	console.log("Listening on port 3000...");
});