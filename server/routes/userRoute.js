const express = require("express");
const userController = require("../controllers/userController");
const { validateToken } = require("../middlewares/validateToken");

const router = express.Router();

router.route("/register").post(userController.RegisterNewUser);
router.route("/login").post(userController.LoginUser);
router.route("/").get(validateToken, userController.getAllUsers);

module.exports = router;
