const express = require("express");
const chatController = require("../controllers/chatController");
const { validateToken } = require("../middlewares/validateToken");
const router = express.Router();

router.route("/").post(validateToken, chatController.createChat);
router.route("/:userId").get(validateToken, chatController.allChats);
router
  .route("/find/:firstId/:secondId")
  .get(validateToken, chatController.findChat);

module.exports = router;
