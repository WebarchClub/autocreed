require("dotenv").config();
const express = require("express");
const app = express();
const axios = require("axios");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const Razorpay = require("razorpay");
const shortid = require("shortid");
const crypto = require("crypto");

// RAZORPAY SETUP
// var razorpay = new Razorpay({
//     key_id: process.env.KEYID,
//     key_secret: process.env.KEYSECRET
// });
// RAZORPAY SETUP

app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(methodOverride("_method"));


// MONGODB SETUP
mongoose.set("debug", true);
var url = process.env.DATABASEURL || "mongodb://localhost:27017/store";
mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.Promise = Promise;
// MONGODB SETUP

// ===========================ORDERS SCHEMA==============================

var orderSchema = new mongoose.Schema({
    order_id: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    name:{
        type: String,
        required: true
    },
    address: {
        type: String
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: Number
    },
    comment: {
        type: String
    },
    items: [String],
    paymentSuccess: {
        type: Boolean,
        default: false
    }
});
var Order = mongoose.model("Order", orderSchema);

// ===========================ORDERS SCHEMA==============================

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
        default: "Awesome Product!!"
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
//     name: "Ruby KeyChain",
//     price: 1000,
//     description: "Ruby Brings Out Your Status"
// }).then((newItem) => {console.log(newItem)}).catch((err) => {console.log(err)});

// Item.find().then((item) => {console.log(item)}).catch((err) => {console.log(err)});
// Item.findOneAndUpdate({_id: "5f3d5aaa9b9a292900db7e08"}, {inCart: true}, {new: true}).then((item) => {console.log(item)}).catch((err) => {console.log(err)});


// =================ROUTES================
app.get("/", (req,res) => {
    res.render("home", {page: "home"});
});
app.get("/journey", (req,res) => {
    res.render("journey", {page: "journey"});
});
app.get("/achievements", (req,res) => {
    res.render("achievements", {page: "achievements"});
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
app.get("/contact", (req,res) => {
    res.render("contact", {page: "contact"});
});
// ==========================SHOP=========================
app.get("/shop", (req,res) => {
    Item.find().then((item) => {
        res.render("shop", {
            page: "shop",
            items: item
        });
    }).catch((err) => {console.log(err)});
});
app.put("/shop/items/:id", (req,res) => {
    Item.findOneAndUpdate({_id: req.params.id}, req.body, {new: true}).then((item) => {
        res.json(item);
    }).catch((err) => {console.log(err)});
});
// ============================SHOP==========================
// ===================ADMIN===================================
app.get("/admin/shop", (req,res) => {
    Item.find().then((item) => {
        res.render("admin/items/index", {items: item});
    }).catch((err) => console.log(err));
});
app.post("/admin/shop", (req,res) => {
    var name = req.body.name;
    var desc = req.body.description;
    var price = req.body.price;
    var image = req.body.image;
    var item = {name: name, image: image, price: price, description: desc};
    Item.create(item).then(() => {
		res.redirect("/admin/shop");
    }).catch((err) => {console.log(err)});
});

app.get("/admin/shop/new", (req,res) => {
    res.render("admin/items/new");
});

app.get("/admin/shop/:id/edit", (req,res) => {
    Item.findById(req.params.id).then((item) => {
        res.render("admin/items/edit", {item: item});
    }).catch((err) => console.log(err));
});

app.put("/admin/shop/:id", (req,res) => {
    var name = req.body.name;
    var desc = req.body.description;
    var price = req.body.price;
    var image = req.body.image;
    var item = {name: name, image: image, price: price, description: desc};
    Item.findByIdAndUpdate(req.params.id, item).then(() => {
        res.redirect("/admin/shop");
    }).catch((err) => console.log(err));
});

app.delete("/admin/shop/:id", (req,res) => {
    Item.findByIdAndRemove(req.params.id).then(() => res.redirect("/admin/shop")).catch((err) => console.log(err));
});
// ===================ADMIN===================================
// ========================RAZORPAY=====================
app.post("/verification", (req,res) => {
    //do validation
    const secret = "12345678";
    const shasum = crypto.createHmac('sha256', secret)
	shasum.update(JSON.stringify(req.body))
    const digest = shasum.digest('hex')
    if(digest === req.headers["x-razorpay-signature"]){
        console.log("request is legit");
        var order = req.body.payload.payment.entity;
        // console.log(order.notes);
        Order.findOneAndUpdate({order_id: order.order_id}, {paymentSuccess: true}, {new: true}).then((updatedOrder) => {console.log(updatedOrder)}).catch((err) => {console.log(err)});
        res.json({status: "ok"});
    }else{
        console.log("Someone is messing up");
    }
});


app.post("/razorpay", async (req, res) => {
    // console.log(req.body);
    const payment_capture = 1;
    const amount = req.body.amount;
    const currency = "INR";
    const options = {
        amount: amount*100, 
        currency, 
        receipt: shortid.generate(), 
        payment_capture
    }
    try{
        const response = await razorpay.orders.create(options);
        Order.create({
            order_id: response.id,
            amount: response.amount,
            name: req.body.name,
            address: req.body.address,
            email: req.body.email,
            phone: req.body.phone,
            comment: req.body.comment,
            items: req.body.items
        }).then((newOrder) => {console.log(newOrder)}).catch((err) => {console.log(err)});
        res.json({
            id: response.id,
            currency: response.currency,
            amount: response.amount
        });
    }
    catch(err){
        console.log(err);
    }
});

app.get("/:id/success", (req,res) => {
    Order.findOne({order_id: req.params.id}).then((order) => {
        res.render("success", {order: order});
    }).catch((err) => {console.log(err)});
});

// ========================RAZORPAY=====================
// ===========================ORDERS======================
app.get("/admin/orders", (req,res) => {
    Order.find({paymentSuccess: true}).then(orders => {
        res.render("admin/orders/index", {orders: orders});
    }).catch(err => console.log(err));
});
// ===========================ORDERS======================
// =================ROUTES======================


app.listen(process.env.PORT || 3000, process.env.IP, function(){
    console.log("AutoCreed Server has Started on 3000");
});