const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const UserRoutes = require("./routes/UserRoutes");
const RoomRoutes = require("./routes/RoomRoutes");
const HttpError = require("./models/HttpError");

const app = express();

const connString =
  "mongodb+srv://Drew:bellabella444@cluster0.j0suz.mongodb.net/Test?retryWrites=true&w=majority";

app.use(bodyParser.json());
app.use(cors());

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

    console.log(connection);
  } catch (err) {
    console.log(err);
  }
};

mongooseConnection();

app.listen(5000, () => {
  console.log("Server is running on port 5000!");
});

mongoose.set("useCreateIndex", true);
