const express = require("express");
const { check } = require("express-validator");

const UserControllers = require("../controllers/UserControllers");

const router = express.Router();

router.post("/signup", [
  check("email").normalizeEmail().isEmail(),
  check("password").not().isEmpty().isLength({ min: 5, max: 21 }),
  UserControllers.signup,
]);

router.post("/login", UserControllers.login);

router.post("/joinRoom", UserControllers.joinRoom);

router.post("/joinCreatedRoom", UserControllers.joinCreatedRoom);

module.exports = router;
