//basic Package
const express = require("express");
const { engine } = require("express-handlebars");
const fs = require("fs");
const fileUpload = require('express-fileupload');
require('dotenv').config();
const flash = require("express-flash");
//express setting
const app = express();
const port = 3000;

const formatMessage = require('./message');
const {
  userJoin,
  getCurrentUser,
  userLeave,
  getRoomUsers
} = require('./users');


// https setup
const https = require('https');

const socketio = require("socket.io");

const options = {
    cert: fs.readFileSync('./localhost.crt'),
    key: fs.readFileSync('./localhost.key')
}
const server = https.createServer(options, app);

require('https').globalAgent.options.rejectUnauthorized = false;

//public css
app.use(express.static(__dirname + "/public"));
app.use(fileUpload());
app.use(flash());
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
const UserPosts = require("./Services/UserPosts");


const userPosts = new UserPosts(knex);

// app.get("/", async (req, res) => {
//     let data = await userPosts.list(req.auth.user);

//     let array = data.map((x) => x.content);
//     console.log(array);

//     res.render("index", {
//         username: req.auth.user,
//         written_text: Array,
//     })
// })

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
app.use("api/notes", new ViewRouter(userPosts).router());

const io=socketio(server);

io.on('connection', socket => {
  socket.on('joinRoom', ({ username, room }) => {
    const user = userJoin(socket.id, username, room);

    socket.join(user.room);

    // Welcome current user
    socket.emit('message', formatMessage("System message", `Welcome to chatroom`));

    // Broadcast when a user connects
    socket.broadcast
      .to(user.room)
      .emit(
        'message',
        formatMessage("System message", `${user.username} has joined the chat`)
      );

    // Send users and room info
    io.to(user.room).emit('roomUsers', {
      room: user.room,
      users: getRoomUsers(user.room)
    });
  });

  // Listen for chatMessage
  socket.on('chatMessage', msg => {
    const user = getCurrentUser(socket.id);

    io.to(user.room).emit('message', formatMessage(user.username, msg));
  });

  // Runs when client disconnects
  socket.on('disconnect', () => {
    const user = userLeave(socket.id);

    if (user) {
      io.to(user.room).emit(
        'message',
        formatMessage("System message", `${user.username} has left the chat`)
      );

      // Send users and room info
      io.to(user.room).emit('roomUsers', {
        room: user.room,
        users: getRoomUsers(user.room)
      });
    }
  });
});



// listen to https server
server.listen(port, () => {
    console.log(`Server is running and listening to port ${port} !`)
});