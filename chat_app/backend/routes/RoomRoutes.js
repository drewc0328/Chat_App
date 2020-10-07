const express = require("express");
const RoomControllers = require("../controllers/RoomControllers");

const router = express.Router();

router.post("/createRoom", RoomControllers.createRoom);

router.post("/addMember", RoomControllers.addMember);

module.exports = router;
