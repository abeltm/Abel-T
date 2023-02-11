const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");

const app = express();

// set up template engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// use body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));

// define routes
app.get("/", function(req, res) {
  res.render("home");
});

app.get("/about", function(req, res) {
  res.render("about");
});

app.get("/projects", function(req, res) {
  res.render("projects");
});

app.get("/services", function(req, res) {
  res.render("services");
});

app.get("/contact", function(req, res) {
  res.render("contact");
});

app.post("/contact", function(req, res) {
  const name = req.body.name;
  const email = req.body.email;
  const message = req.body.message;
  
  // send email with the contact information
  // ...

  res.render("contact-success", { name: name });
});

// start server
app.listen(3000, function() {
  console.log("Server started on port 3000");
});
