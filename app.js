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
    var albumId = [];
    var albumPromise = [];
    var feed = [];
    axios.get(`https://graph.instagram.com/me/media?fields=id,permalink,media_type,media_url,thumbnail_url,username,timestamp&access_token=${appToken}`).then(function(data){
        data.data.data.forEach(function(val){
            if(val.media_type === "IMAGE"){
                feed.push({
                    url: val.media_url,
                    instaUrl: val.permalink
                });
            }
            if(val.media_type === "VIDEO"){
                feed.push({
                    url: val.thumbnail_url,
                    instaUrl: val.permalink
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
            albumPromise.push(axios.get(`https://graph.instagram.com/${val.id}/children?fields=id,permalink,media_type,media_url,thumbnail_url,username,timestamp&access_token=${appToken}`));
        });
        Promise.all(albumPromise).then((val) => {
            val.forEach((data) => {
                data.data.data.forEach((val) => {
                    if(val.media_type === "IMAGE"){
                        feed.push({
                            url: val.media_url,
                            instaUrl: val.permalink
                        });
                    }
                    if(val.media_type === "VIDEO"){
                        feed.push({
                            url: val.thumbnail_url,
                            instaUrl: val.permalink
                        });
                    }
                });
            });
            console.log(feed.length);
            res.render("gallery", {
                page: "gallery",
                instafeed: feed
            });
        });
    })
    .catch(err => console.log(err));
});
app.get("/sponsors", (req, res) => {
    res.render("sponsors", { page: "sponsors" });
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