//basic Package
const express = require("express");
const { engine } = require("express-handlebars");
const fs = require("fs");
const fileUpload = require('express-fileupload');
require('dotenv').config();

//express setting
const app = express();
const port = 3000;

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

//knex setting
const development = require("./knexfile").development;
const knex = require("knex")(development);

//passport functions app.js
const passportFunctions = require("./passport");
const cookieParser = require("cookie-parser");
const expressSession = require("express-session");
const AuthRouter = require("./Routers/authRouter");
const authRouter = new AuthRouter();
const ViewRouter = require("./Routers/viewRouter");
const viewRouter = new ViewRouter(knex);
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