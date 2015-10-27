/*global require, console, __dirname*/
var express = require("express");
var bodyParser = require("body-parser");
var sendmail = require("sendmail");
var app = express();

// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({
    extended: true
})

// create application/json parser
var jsonParser = bodyParser.json()

// set the views root folder 
app.set("views", __dirname + "/views");
app.set("view engine", "jade");

// set the dirctory that
// holds all the static files 
// to be procesed
app.use(express.static(__dirname + "/public"));

// ROUTES SET UP
// home page
app.get("/", function (req, res) {
    "use strict";
    res.render("index");
});
// about page
app.get("/about", function (req, res) {
    res.render("about");
})
// contacts page
app.get("/contacts", function (req, res) {
    res.render("contacts");
})
//send page
app.post("/send", urlencodedParser, function (req, res) {
    "use strict";
    res.render("send", { name: req.body.f_name, surname: req.body.s_name, email: req.body.email, message: req.body.message });
    // send mail to customer
    // support service
    sendmail({
        "from": req.body.email,
        "to": "evgenivasilev1209@abv.bg",
        "subject": 'Message from Customer Services',
        "content": req.body.f_name + "\n" + req.body.s_name + "\n" + req.body.email + "\n" + req.body.message,
    }, function (err, reply) {
        console.log(err && err.stack);
        console.dir(reply);
    })
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
