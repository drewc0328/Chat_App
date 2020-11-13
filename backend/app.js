// Left off at 1:15:53

const express = require("express");
const cors = require("cors");
const socketio = require("socket.io");
const http = require("http");

const { addUser, removeUser, getUser, getUsersInRoom } = require("./users");

const PORT = process.env.PORT || 5000;

const router = require("./router");
const { callbackify } = require("util");

const app = express();
const server = http.createServer(app);
const io = socketio(server);

io.on("connection", (socket) => {
  socket.on("join", ({ name, room }, callback) => {
    const { error, user } = addUser({ id: socket.id, name, room });
    console.log("JOIN USER: ", user);

    if (error) {
      return callback(error);
    }

    socket.emit("welcomeMessage", {
      user: "admin",
      text: `${user.name}, welcome to the room ${user.room}`,
    });
    socket.broadcast.to(user.room).emit("welcomeMessage", {
      user: "admin",
      text: `${user.name} has joined!`,
    });

    socket.join(user.room);

    callback();
  });

  socket.on("sendMessage", (message, callback) => {
    const user = getUser(socket.id);
    console.log("User: ", user);
    console.log("Message: ", message);

    console.log("User room: ", user.foundUser.room);
    console.log("User name: ", user.foundUser.name);

    io.to(user.foundUser.room).emit("message", {
      user: user.foundUser.name,
      text: message,
    });

    callback();
  });

  socket.on("disconnect", () => {
    console.log("User has left");
  });
});

app.use(cors());

app.use(router);

server.listen(PORT, () => {
  console.log(`Connected on port ${PORT}`);
});
