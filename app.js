//basic Package
const express = require("express");
const { engine } = require("express-handlebars");

//express setting
const app = express();
const port = 3000;
const ip = "localhost";

//public css
app.use(express.static("public"));

//handlebars setting
app.engine("handlebars", engine({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

//response page
//index page
app.get("/", (req, res) => {
    res.render("page/login", {
        title: "Login",
        page: "login"
    });
});

//login page
app.get("/index", (req, res) => {
    res.render("page/index", {
        title: "Cryptociety",
        page: "index"
    });
});

//profile page
app.get("/profile", (req, res) => {
    res.render("page/profile", {
        title: "Profile",
        page: "profile"
    });
});

//404 page
app.use((req, res) => {
    res.status(404).render("page/404", {
        title: "404",
        page: "404"
    });
});

//server port listen
app.listen(port, ip, () => {
    console.log(`Server is running and listening to port ${port} !`)
})