const express = require("express");
const app = express();
const path = require("path");

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
app.get("/about", (req, res) => {
    const name = "about";
    const skills = [
        {name: "Google", value: "100%"},
        {name: "JavaScript", value: "65%"},
        {name: "HTML", value: "65%"},
        {name: "Linux", value: "65%"},
        {name: "C++", value: "60%"},
        {name: "Bash", value: "50%"},
        {name: "CSS", value: "50%"},
        {name: "Node.js", value: "50%"},
        {name: "Express.js", value: "50%"},
        {name: "MySQL", value: "40%"},
        {name: "Mongoose", value: "40%"}];
    res.render(name, {name: name, skills: skills});
});

app.get("/contact", (req, res) => {
    const name = "contact";
    const formSubmit = false;
    res.render(name, {name: name, formSubmit: formSubmit});
});

app.post("/contact", (req, res) => {
    // post data in req.body
    const name = "contact";
    const formSubmit = true;
    const { fname, lname, email, message } = req.body;
    console.log(`Thank you ${fname} ${lname} we will email ${email} your message!`);
    res.render(name, {name: name, formSubmit: formSubmit, fname: fname, email: email});
});

// path for everything else
app.get("*", (req, res) => {
    res.render("home");
});

// app is listening to port 3000
app.listen(3000, () => {
    console.log("Listening on 3000");
});