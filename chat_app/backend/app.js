const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const http = require("http");
const socketio = require("socket.io");

const UserRoutes = require("./routes/UserRoutes");
const RoomRoutes = require("./routes/RoomRoutes");
const HttpError = require("./models/HttpError");

const app = express();
const server = http.createServer(app);
const io = socketio(server);

const connString =
  "mongodb+srv://Drew:bellabella444@cluster0.j0suz.mongodb.net/Test?retryWrites=true&w=majority";

app.use(cors());
app.use(bodyParser.json());

app.use("/api/users", UserRoutes);
app.use("/api/rooms", RoomRoutes);

app.use((req, res, next) => {
  const error = new HttpError("Couldn't find this route", 404);
  throw error;
});

app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json({ message: error.message || "An unknown error occurred!" });
});

const mongooseConnection = async () => {
  try {
    const connection = await mongoose.connect(connString, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("Connected to DB");
  } catch (err) {
    console.log(err);
  }
};

mongooseConnection();

io.on("connection", (socket) => {
  socket.on("join", ({ name, room }, callback) => {
    const { error, user } = addUser({ id: socket.id, name, room });
    console.log("JOIN USER: ", user);

    if (error) {
      return callback(error);
    }

    socket.emit("message", {
      user: "admin",
      text: `&{user.name}, welcome to the room ${user.room}`,
    });
    socket.broadcast
      .to(user.room)
      .emit("message", { user: "admin", text: `${user.name} has joined!` });

    socket.join(user.room);

    callback();
  });

  socket.on("sendMessage", (message, callback) => {
    const user = getUser(socket.id);
    console.log("User: ", user);
    console.log("Message: ", message);

    io.to(user.room).emit("message", { user: user.name, text: message });

    callback();
  });

  socket.on("disconnect", () => {
    console.log("User has left");
  });
});

server.listen(5000, () => {
  console.log("Server is running on port 5000!");
});

mongoose.set("useCreateIndex", true);
