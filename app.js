//basic Package
const express = require("express");
const { engine } = require("express-handlebars");
const fs = require("fs");
const fileUpload = require('express-fileupload');
const bodyParser = require('body-parser');

//express setting
const app = express();
const port = 3000;
const ip = "localhost";

//public css
app.use(express.static(__dirname + "/public"));
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
        title: "profile",
        page: "profile",
        layout: "other"
    });
});

//setting page
app.get("/setting", (req, res) => {
    res.render("page/setting", {
        title: "setting",
        page: "setting",
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
app.get("/api/setting", (req, res) => {
    let files = fs.readdirSync(__dirname + "/public/image/photo");
    res.json({
        "photo": files
    })
})
app.post("/setting", (req, res) => {
    //create new icon
    let data = req.files.files
    fs.writeFile(__dirname + "/public/image/uploaded/userIcon.png", data.data, (err) => {
        if (err) {
            console.log(err);
        }
    });
    res.render("page/setting", {
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
app.get(`/download/album/:name`, (req, res) => {
    let caches = {};
    function readFile(file) {
        return new Promise((resolve, reject) => {
            fs.readFile(__dirname + "/public/image/photo/" + file, (err, body) => {
                if (err) {
                    return reject(err);
                } else {
                    resolve(body);
                }
            });
        });
    }
    if (caches[req.params.name] == null) {
        caches[req.params.name] = readFile(req.params.name);
    }
    caches[req.params.name]
        .then((body) => {
            res.send(body);
        })
        .catch((e) => res.status(500).send(e.message));
});
app.delete("/delete/album/", (req, res) => {
    //get data form fontend
    let data = req.body.image
    //remove image
    fs.unlink(__dirname + `/public/image/photo/${data}`, (err) => {
        if (err) {
            console.log(err);
        }
    });
});

app.delete("/setting", (req, res) => {
    fs.unlink(__dirname + "/public/image/uploaded/userIcon.png", (err) => {
        if (err) {
            console.log(err);
        }
    });
    res.render("page/setting", {
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

//logged out
//login page
app.get("/", (req, res) => {
    res.render("page/login", {
        title: "Login",
        page: "login"
    });
});

app.get("/signup", (req, res) => {
    res.render("page/signup", {
        title: "Signup",
        page: "signup"
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