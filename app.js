//basic Package
const express = require("express");
const { engine } = require("express-handlebars");
const fs = require("fs");
const fileUpload = require('express-fileupload');
const bodyParser = require('body-parser');
require('dotenv').config();

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
require('https').globalAgent.options.rejectUnauthorized = false;

//public css
app.use(express.static(__dirname + "/public"));
app.use(fileUpload());

//handlebars setting
app.engine("handlebars", engine({ defaultLayout: "main" }));
app.set("view engine", "handlebars");


//response page
//logged in
//Market page
app.get("/market", (req, res) => {
    res.render("page/market", {
        title: "Market",
        page: "market",
        layout: "other"
    });
});

//index page
app.get("/index", (req, res) => {
    res.render("page/index", {
        title: "Index",
        page: "index",
        layout: "other",
        username: "Miofong",
        slogan: "Happy Boy",
        icon: () => {
            //check icon Exists
            const iconExists = fs.existsSync(__dirname + "/public/image/uploaded/userIcon.png")
            if (iconExists) {
                let img = "/image/uploaded/userIcon.png"
                return img;
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
        layout: "other",
        userId: process.env.DB_ID,
        email: process.env.DB_EMAIL,
        username: process.env.DB_USERNAME,
        password: "********",
        gender: process.env.DB_GENDER,
        birthday: process.env.DB_BIRTHDAY,
        country: process.env.DB_COUNTRY,
        joinDate: process.env.DB_JOINDATE,
        slogan: process.env.DB_SLOGAN,
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
app.put("/setting", (req, res) => {
    knex('user_profile')
        .select({
            id: 'id',
            name: 'email_address'
        })
        .then(rows => {
            console.log(rows);
        })
        .catch(err => {
            console.console(err);
        })


    let data = req.body.input
    //json to object
    data = JSON.parse(data)
    //verify password
    if (data.password_verify !== process.env.DB_PASSWORD) {
        res.json({
            "verify": "fail",
            "err": "Incorret password! Please try again!"
        })
        data.password_verify = "";
    }
    //check less 6 characters username  
    else if (data.new_username) {
        if (data.new_username.length < 6) {
            res.json({
                "verify": "fail",
                "err": "Username can not less than 6 characters!"
            })
            data.new_username = "";
        } else {
            res.json({
                "verify": "success"
            })
        }
    }
    //check less 8 characters password  
    else if (data.new_password) {
        if (data.new_password.length < 8 || data.confirm_new_password.length < 8) {
            res.json({
                "verify": "fail",
                "err": "Password can not less than 8 characters!"
            })
            data.new_password = "";
            data.confirm_new_password = "";
            //confirm password  
        } else if (data.new_password != data.confirm_new_password) {
            res.json({
                "verify": "fail",
                "err": "Confirm password is incorrect!"
            })
            data.new_password = "";
            data.confirm_new_password = "";
        } else {
            res.json({
                "verify": "success"
            })
        }
    } else {
        res.json({
            "verify": "success"
        })
    }
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
//login & logout page
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

// passport functions app.js
const passportFunctions = require("./passport");
const cookieParser = require("cookie-parser");
const expressSession = require("express-session");

const AuthRouter = require("./Routers/authRouter");
const authRouter = new AuthRouter();
const ViewRouter = require("./Routers/viewRouter");
const viewRouter = new ViewRouter();

app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
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
https.createServer(options, app).listen(port, () => {
    console.log(`Server is running and listening to port ${port} !`)
});