const Chat = require("../models/chatModel");

exports.createChat = async (req, res) => {
  const { userId } = req.body;

  if (!userId) {
    console.log("UserId param not sent with request");
    return res.sendStatus(400);
  }

  const existingChat = await Chat.findOne({
    members: { $all: [req.user._id, userId] },
  }).populate({
    path: "members",
    select: "-password",
  });

  if (existingChat) {
    return res.status(200).json(existingChat);
  }

  try {
    const newChat = new Chat({
      members: [req.user._id, userId],
    });

    const createdChat = await newChat.save();

    const fullChat = await Chat.findOne({ _id: createdChat._id }).populate(
      "members",
      "-password"
    );

    res.status(200).json(fullChat);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.allChats = async (req, res) => {
  try {
    const chat = await Chat.find({
      members: { $all: [req.user._id] },
    })
      .populate({
        path: "members",
        select: "-password",
      })
      .sort({ updatedAt: -1 });
    res.status(200).json(chat);
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.findChat = async (req, res) => {
  try {
    const chat = await Chat.findOne({
      members: { $all: [req.params.firstId, req.params.secondId] },
    });
    res.status(200).json(chat);
  } catch (error) {
    res.status(500).json(error);
  }
};
