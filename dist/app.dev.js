"use strict";

var express = require("express");

var app = express();

var axios = require("axios");

var bodyParser = require("body-parser");

var mongoose = require("mongoose");

app.set("view engine", "ejs");
app.use(express["static"](__dirname + "/public"));
app.use(bodyParser.urlencoded({
  extended: true
})); // MONGODB SETUP

mongoose.set("debug", true);
var url = process.env.DATABASEURL || "mongodb://localhost/store";
mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
mongoose.Promise = Promise; // MONGODB SETUP
// ==========================ITEMS SCHEMA=================================

var itemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  description: {
    type: String,
    "default": "Awesome Product to make you look cool"
  },
  inCart: {
    type: Boolean,
    "default": false
  },
  image: {
    type: String,
    "default": "https://images.unsplash.com/photo-1500962573706-c381a5d62537?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1191&q=80"
  }
});
var Item = mongoose.model("Item", itemSchema); // =========================================ITEMS SCHEMA=======================
// Item.create({
//     name: "Gold KeyChain",
//     price: 100,
//     description: "Bronze Brings Out Your Status"
// }).then((newItem) => {console.log(newItem)}).catch((err) => {console.log(err)});
// Item.find().then((item) => {console.log(item)}).catch((err) => {console.log(err)});
// Item.findOneAndUpdate({_id: "5f3d5aaa9b9a292900db7e08"}, {inCart: true}, {new: true}).then((item) => {console.log(item)}).catch((err) => {console.log(err)});
// =================ROUTES================

app.get("/", function (req, res) {
  res.render("home", {
    page: "home"
  });
});
app.get("/team", function (req, res) {
  res.render("team", {
    page: "team"
  });
});
app.get("/alumni", function (req, res) {
  res.render("alumni", {
    page: "alumni"
  });
});
app.get("/gallery", function (req, res) {
  res.render("gallery", {
    page: "gallery"
  });
});
app.get("/sponsors", function (req, res) {
  res.render("sponsors", {
    page: "sponsors"
  });
}); // ==========================SHOP=========================

app.get("/support", function (req, res) {
  Item.find().then(function (item) {
    res.render("support", {
      page: "support",
      items: item
    });
  })["catch"](function (err) {
    console.log(err);
  });
});
app.put("/support/items/:id", function (req, res) {
  Item.findOneAndUpdate({
    _id: req.params.id
  }, req.body, {
    "new": true
  }).then(function (item) {
    res.json(item);
  })["catch"](function (err) {
    console.log(err);
  });
}); // ============================SHOP==========================

app.get("/contact", function (req, res) {
  res.render("contact", {
    page: "contact"
  });
}); // =================ROUTES======================

app.listen(process.env.PORT || 3000, process.env.IP, function () {
  console.log("AutoCreed Server has Started on 3000");
});