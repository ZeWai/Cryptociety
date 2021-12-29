//basic Package
const express = require("express");
const { engine } = require("express-handlebars");
const fs = require("fs");
const fileUpload = require('express-fileupload');

//express setting
const app = express();
const port = 3000;
const ip = "localhost";

// https setup
const https = require('https');
const options = {
    cert: fs.readFileSync('./localhost.crt'),
    key: fs.readFileSync('./localhost.key')
}

//public css
app.use(express.static(__dirname + "/public"));
app.use(fileUpload());

//handlebars setting
app.engine("handlebars", engine({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

//response page
//logged in
//index page
app.get("/index", (req, res) => {
    res.render("page/index", {
        title: "Cryptociety",
        page: "index",
        layout: "other"
    });
});

//profile page
app.get("/profile", (req, res) => {
    res.render("page/profile", {
        title: "Profile",
        page: "profile",
        layout: "other",
        icon: () => {
            const iconExists = fs.existsSync(__dirname + "/public/image/uploaded/userIcon.png")
            if (iconExists) {
                return "../../../../image/uploaded/userIcon.png";
            } else {
                return "";
            }
        }
    });
});

app.post("/profile", (req, res) => {
    //create new icon
    let data = req.files.files
    fs.writeFile(__dirname + "/public/image/uploaded/userIcon.png", data.data, (err) => {
        if (err) {
            console.log(err);
        }
    });
});

//setting page
app.get("/setting", (req, res) => {
    res.render("page/setting", {
        title: "Setting",
        page: "setting",
        layout: "other"
    });
});

//logged out
//login page
app.get("/", (req, res) => {
    res.render("page/login", {
        title: "Login",
        page: "login"
    });
});

//404 page
app.use((req, res) => {
    res.status(404).render("page/404", {
        title: "404",
        page: "404",
    });
});



// app.post("/signup", passport.authenticate("local-signup", {
//     successRedirect: "profile",
//     failureRedirect: "page/404"
// }))

//server port listen
// app.listen(port, ip, () => {
//     console.log(`Server is running and listening to port ${port} !`)
// })


// passport functions app.js
require('dotenv').config();
const passportFunctions = require("./passport");
const cookieParser = require("cookie-parser");
const expressSession = require("express-session");

const AuthRouter = require("./Routers/authRouter");
const authRouter = new AuthRouter();
const ViewRouter = require("./Routers/viewRouter");
const viewRouter = new ViewRouter();

app.use(cookieParser());
app.use(express.urlencoded({ extended: true}));
app.use(express.json());
app.use(expressSession({
    secret: "secret",
    resave: true,
    saveUninitialized: true,
}));

app.use(passportFunctions.initialize());

app.use(passportFunctions.session());

app.use("/", authRouter.router());
app.use("/", viewRouter.router());




// listen to https server
https.createServer(options, app).listen(3000, () => {
    console.log("application listening to port 3000");
});
