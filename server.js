var express = require("express");
var http = require("http");
var port = 8080;
var app = express();

app.use(express.static(__dirname + "/content"));

app.get("/", function(req, res) {
	res.end("GET root");
});

http.createServer(app).listen(port);
console.log("listening at port " + port);
