const HttpError = require("../models/HttpError");
const { validationResult } = require("express-validator");
const User = require("../models/Users");
const Room = require("../models/Rooms");
const mongooseUniqueValidator = require("mongoose-unique-validator");

const signup = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors);
    const error = new HttpError(
      "Invalid inputs passed, please check your data",
      422
    );
    return next(error);
  }

  const { name, email, password } = req.body;

  let existingUser;
  try {
    existingUser = await User.findOne({ email: email });
  } catch (err) {
    const error = new HttpError("Signing up failed, please try again", 500);
    return next(error);
  }

  if (existingUser) {
    const error = new HttpError(
      "A user with that email already exists, please signup with a different email",
      422
    );
    return next(error);
  }

  const createdUser = new User({
    name,
    email,
    password,
  });

  try {
    await createdUser.save();
  } catch (err) {
    const error = new HttpError(
      "Signing up user failed, please try again",
      500
    );
    return next(error);
  }

  res.status(201).json({ user: createdUser.toObject({ getters: true }) });
};

const login = async (req, res, next) => {
  const { email, password } = req.body;

  let user;
  try {
    user = await User.findOne({ email: email });
  } catch (err) {
    const error = new HttpError("A user with that email doesn't exist", 500);
    return next(error);
  }

  if (!user || user.password !== password) {
    const error = new HttpError(
      "Invalid login credentials, please try again",
      401
    );
    return next(error);
  }

  res.json({ user: user.toObject({ getters: true }) });
};

const joinRoom = async (req, res, next) => {
  const { userId, roomId } = req.body;

  let user;
  try {
    user = await User.findById(userId);
  } catch (err) {
    const error = new HttpError(err.message, 500);
    return next(error);
  }

  let room;
  try {
    room = await Room.findById(roomId);
  } catch (err) {
    const error = new HttpError(err.message, 500);
    return next(error);
  }

  console.log("ROOOOM: ", room);

  user.rooms.push({
    name: room.name,
    id: room.id,
  });

  user.save();

  res.json({ user: user });
};

// Create room differs from join because we can give room name as parameter
const joinCreatedRoom = async (req, res, next) => {
  const { userId, roomId, roomName } = req.body;

  let user;
  try {
    user = await User.findById(userId);
  } catch (err) {
    const error = new HttpError(err.message, 500);
    return next(error);
  }

  user.rooms.push({
    name: roomName,
    id: roomId,
  });

  user.save();

  res.json({ user: user });
};

exports.signup = signup;
exports.login = login;
exports.joinRoom = joinRoom;
exports.joinCreatedRoom = joinCreatedRoom;
