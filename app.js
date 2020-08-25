const express = require("express");
const app = express();
const axios = require("axios");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({extended: true}));


// MONGODB SETUP
mongoose.set("debug", true);
var url = process.env.DATABASEURL || "mongodb://localhost/store";
mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.Promise = Promise;
// MONGODB SETUP

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
        default: "Awesome Product to make you look cool"
    },
    inCart: {
        type: Boolean,
        default: false
    },
    image: {
        type: String,
        default: "https://images.unsplash.com/photo-1500962573706-c381a5d62537?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1191&q=80"
    }
});
var Item = mongoose.model("Item", itemSchema);
// =========================================ITEMS SCHEMA=======================

// Item.create({
//     name: "Bronze KeyChain",
//     price: 50,
//     description: "Bronze Brings Out Your Status"
// }).then((newItem) => {console.log(newItem)}).catch((err) => {console.log(err)});

// Item.find().then((item) => {console.log(item)}).catch((err) => {console.log(err)});
// Item.findOneAndUpdate({_id: "5f3d5aaa9b9a292900db7e08"}, {inCart: true}, {new: true}).then((item) => {console.log(item)}).catch((err) => {console.log(err)});


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
    res.render("gallery", { page: "gallery"});
});
app.get("/sponsors", (req, res) => {
    res.render("sponsors", { page: "sponsors" });
});
// ==========================SHOP=========================
app.get("/support", (req,res) => {
    Item.find().then((item) => {
        res.render("support", {
            page: "support",
            items: item
        });
    }).catch((err) => {console.log(err)});
});
app.put("/support/items/:id", (req,res) => {
    Item.findOneAndUpdate({_id: req.params.id}, req.body, {new: true}).then((item) => {
        res.json(item);
    }).catch((err) => {console.log(err)});
});
// ============================SHOP==========================
app.get("/contact", (req,res) => {
    res.render("contact", {page: "contact"});
});
// =================ROUTES======================


app.listen(process.env.PORT || 3000, process.env.IP, function(){
    console.log("AutoCreed Server has Started on 3000");
});