const HttpError = require("../models/HttpError");
const Room = require("../models/Rooms");
const Users = require("../models/Users");

const createRoom = async (req, res, next) => {
  const { name, userId } = req.body;

  // Get user
  let user;
  try {
    user = await Users.findById(userId);
  } catch (err) {
    const error = new HttpError(err.message, 500);
    return next(error);
  }

  console.log("username: ", user);

  const createdRoom = new Room({
    name,
    members: [{ name: user.name, id: user.id }],
  });

  try {
    await createdRoom.save();
  } catch (err) {
    const error = new HttpError(err.message, 500);
    return next(error);
  }

  res.status(201).json({ room: createdRoom.toObject({ getters: true }) });
};

const addMember = async (req, res, next) => {
  const { userId, roomId } = req.body;

  let user;
  try {
    user = await Users.findById(userId);
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

  room.members.push({
    name: user.name,
    id: user.id,
  });

  room.save();

  res.json({ room: { name: room.name, id: room.id } });
};

exports.createRoom = createRoom;
exports.addMember = addMember;
