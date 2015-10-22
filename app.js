/*global require, console, __dirname*/
var express = require("express");
var app = express();

// set the views root folder 
app.set("views", __dirname + "/views");
app.set("view engine", "jade");

// set the dirctory that
// holds all the static files 
// to be procesed
app.use(express.static(__dirname + "/public"));

// ROUES SET UP
// home page
app.get("/", function (req, res) {
	"use strict";
	res.render("index");
});
// about page
app.get("/about", function (req, res) {
	res.render("about");
})
// contact page
app.get("/contacts", function (req, res) {
	res.render("contacts");
})
// error handling
app.use(function (err, req, res, next) {
	"use strict";
	console.error(err.stack);
	res.status(500).send('Something broke!');
});


// SERVER SET UP
app.listen(9000, function () {
	"use strict";
	console.log("Server created at 9000");
	console.log(__dirname);
});
