const express = require("express");
const app = express();
const dotenv = require("dotenv");
const path = require("path");
const mongoose = require("mongoose");
const Skill = require("./models/skill");    // mongoose skill schema and model
const Message = require("./models/message");    // mongoose request schema and model

// connect to env 
dotenv.config();

// initializing db url
const dbUrl = (process.env.NODE_ENV == "local") ?
            'mongodb://localhost:27017/portfolio' :
            process.env.DB_URL
console.log(dbUrl)

//connect to mongo db
// local mongo url: 'mongodb://localhost:27017/portfolio'
// const dbUrl = process.env.DB_URL || 'mongodb://localhost:27017/portfolio';   // connect to atlas mongo db
mongoose.connect(dbUrl, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => {
        console.log("connected to mongodb");
    })
    .catch( err => {
        console.log("error connecting to mongo");
        console.log("err");
});

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true}));
app.use(express.json());

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

// home page for get request
app.get("/", (req, res) => {
    const name = "home";
    res.render(name, {name: name});
});

// about me page
app.get("/about", async (req, res) => {
    const name = "about";
    // finding skills from portfolio db
    let skills = await Skill.find({});
    skills.sort(sortFunction);
    res.render(name, {name: name, skills: skills});
});

app.get("/contact", (req, res) => {
    const name = "contact";
    let formSubmit = false;
    formSubmit = req.query.formSubmit;
    if (formSubmit) {
        let fname = req.query.fname;
        let email = req.query.email;
        let spam = req.query.spam;
        res.render(name, {name: name, formSubmit: formSubmit, fname: fname, email: email, spam: spam});
    }
    else {
        res.render(name, {name: name, formSubmit: formSubmit});
    }
});

let postRequests = [];
app.post("/contact", async (req, res) => {
    // post data in req.body
    const name = "contact";
    const { fname, lname, email, message } = req.body;
    const formSubmit = true;
    let spam = false;
    postRequests.push(req.body);
    console.log(postRequests);
    if (JSON.stringify(postRequests[0]) != JSON.stringify(postRequests[1])) {
        // not spam, update db
        spam = false;
        console.log(`Thank you ${fname} ${lname} we will email ${email} your message!`);
        console.log("GOOD, lets update db");
        let newMessage = new Message(req.body);
        await newMessage.save();
        if (postRequests.length > 1){
            postRequests.shift();
        }
    }
    else {
        // spam, do not update the db
        spam = true;
        console.log("spam attack");
        postRequests.shift();
    }
    res.redirect(`/contact?formSubmit=${formSubmit}&fname=${fname}&email=${email}&spam=${spam}`);
});

// path for everything else
app.get("*", (req, res) => {
    res.render("home");
});

// app is listening to port env port or 3000
const port = process.env.PORT || 3000 ;
app.listen(port, () => {
    console.log(`listening on port: ${port}`);
});

function sortFunction(a, b){
    let first = parseInt(a.value.replace("%", ""));
    let second = parseInt(b.value.replace("%", ""));
    if (first > second){
        // console.log(a.value + " > " + b.value);
        return -1;
    } 
    if (first < second) {
        // console.log(a.value + " < " + b.value);
        return 1;
    }
    return 0;
};