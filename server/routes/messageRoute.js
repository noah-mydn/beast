const express = require("express");
const messageController = require("../controllers/messageController");
const { validateToken } = require("../middlewares/validateToken");

const router = express.Router();

router.route("/").post(validateToken, messageController.addMessage);
router.route("/:chatId").get(validateToken, messageController.fetchMessages);

module.exports = router;
