//basic Package
const express = require("express");
const { engine } = require("express-handlebars");
const fs = require("fs");
const fileUpload = require('express-fileupload');

//express setting
const app = express();
const port = 3000;
const ip = "localhost";

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
            //check icon Exists
            const iconExists = fs.existsSync(__dirname + "/public/image/uploaded/userIcon.png")
            if (iconExists) {
                let img = "/image/uploaded/userIcon.png"
                return img;
            } else {
                return "";
            }
        },
        photo: () => {
            //check photo Exists
            let files = fs.readdirSync(__dirname + "/public/image/photo");
            return files[0];
        }
    });
});
app.get("/api/profile", (req, res) => {
    let files = fs.readdirSync(__dirname + "/public/image/photo");
    res.json({
        "photo": files
    })
})
app.post("/profile", (req, res) => {
    //create new icon
    let data = req.files.files
    fs.writeFile(__dirname + "/public/image/uploaded/userIcon.png", data.data, (err) => {
        if (err) {
            console.log(err);
        }
    });
    res.render("page/profile", {
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
app.delete("/profile", (req, res) => {
    fs.unlink(__dirname + "/public/image/uploaded/userIcon.png", (err) => {
        if (err) {
            console.log(err);
        }
    });
    res.render("page/profile", {
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

//server port listen
app.listen(port, ip, () => {
    console.log(`Server is running and listening to port ${port} !`)
})