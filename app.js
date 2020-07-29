const express = require("express");
const app = express();
const axios = require("axios");
const bodyParser = require("body-parser");

app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({extended: true}));

//INSTAGRAM SETUP

const appId = "1093218357746001";
const appSecret = "2c534112e166317823a69625a366a234";
const appToken = "IGQVJYUmNqR2dNWmF4SXRwSXBNRlBOZAl9nZAXE0a1hwcTdiWHM0dFBuY0ZABQTJKNGJSNmw2TzRydFd4aE53Ml92NmVxYUYzdjM0bGJTTlJ2aWVFNW93azc3NFhvcmdtTWdsaHlONE56eC1OeUJwdlYzcQZDZD";

var albumId = [];
var feed = [];
var vada = [];

//INSTAGRAM SETUP


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
    axios.get(`https://graph.instagram.com/me/media?fields=id,media_type,media_url,thumbnail_url,username,timestamp&access_token=${appToken}`).then(function(data){
        data.data.data.forEach(function(val){
            if(val.media_type === "IMAGE"){
                feed.push({
                    url: val.media_url,
                    time: val.timestamp
                });
            }
            if(val.media_type === "VIDEO"){
                feed.push({
                    url: val.thumbnail_url,
                    time: val.timestamp
                });
            }
            if(val.media_type === "CAROUSEL_ALBUM"){
                albumId.push({id: val.id});
            }
        });
        return albumId;
    })
    .then((data) => {
        data.forEach((val) => {
            vada.push(axios.get(`https://graph.instagram.com/${val.id}/children?fields=id,media_type,media_url,thumbnail_url,username,timestamp&access_token=${appToken}`));
        });
        Promise.all(vada).then((val) => {
            val.forEach((data) => {
                data.data.data.forEach((val) => {
                    if(val.media_type === "IMAGE"){
                        feed.push({
                            url: val.media_url,
                            time: val.timestamp
                        });
                    }
                    if(val.media_type === "VIDEO"){
                        feed.push({
                            url: val.thumbnail_url,
                            time: val.timestamp
                        });
                    }
                });
            });
            console.log(feed);
            res.render("gallery", {
                page: "gallery",
                instafeed: feed
            });
        });
    })
    .catch(err => console.log(err));
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