const express = require("express");
const app = express();
const axios = require("axios");
const bodyParser = require("body-parser");

app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({extended: true}));


// =================ROUTES================
app.get("/", (req,res) => {
    res.render("home", {page: "home"});
});
app.get("/team", (req,res) => {
    res.render("team", {page: "team"});
});
app.get("/alumni", (req,res) => {
    res.render("alumni", {page: "alumni"});
});
app.get("/gallery", (req,res) => {
    res.render("gallery", {page: "gallery"});
});
app.get("/support", (req,res) => {
    res.render("support", {page: "support"});
});
app.get("/contact", (req,res) => {
    res.render("contact", {page: "contact"});
});
// =================ROUTES======================


app.listen(process.env.PORT || 3000, process.env.IP, function(){
    console.log("AutoCreed Server has Started on 3000");
});