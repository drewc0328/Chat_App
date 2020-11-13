const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const RoomSchema = new Schema({
  name: String,
  members: [{ name: String, id: String }],
  messages: [{ name: String, message: String }],
});

module.exports = mongoose.model("Room", RoomSchema);
