const mongoose = require("mongoose");

const ChatSchema = mongoose.Schema(
  {
    members: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  { timestamps: true }
);

const ChatModel = mongoose.model("chat", ChatSchema);
module.exports = ChatModel;
