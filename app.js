
const express = require("express");

const app = express();

const port = 5000;

const bodyParser = require("body-parser");

// to use mongoose
const mongoose = require("mongoose");

// get config 
const { mongoUrl } = require("./config/keys");

//connect mongoose with your database
mongoose.connect(mongoUrl, { useNewUrlParser: true })

const Wish = require("./model/wish")


//to use static files

app.use(express.static("public"))

//use body parser to handle body and posts requests
app.use(bodyParser.urlencoded({ extended: false }))


//parse application/json
app.use(bodyParser.json())



app.set("view engine", "ejs")


const data = ["eat", "sleep", "code"];


//fetching data
app.get("/", (req, res) => {


    Wish.find({}).then((data) => {

        console.log(data);

        res.render("home", { "data": data });

    })


    



})

app.get("/profile/:id", (req, res) => {


    res.send("aaaaaa" + req.params.id)

})

app.get("/about", (req, res) => {

    res.render("about");

})

app.post("/sent", (req, res) => {

    console.log(req.body.item)

    const item = new Wish({

        wish: req.body.item

    })

    item.save().then(() => {

        console.log("saved")

    })

})





app.delete("/remove/:id", (req, res) => {


Wish.findOneAndDelete({wish:req.params.id}).then((data)=>{


    console.log("deleted")


})

    console.log("got", +req.params.id)

})






app.listen(port, () => {

    console.log("running");

})





