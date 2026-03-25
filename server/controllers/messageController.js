const Message = require("../models/messageModel");

exports.addMessage = async (req, res) => {
  const { chatId, senderId, message } = req.body;

  const newMessage = new Message({
    chatId,
    senderId,
    message,
  });

  try {
    const Msg = await newMessage.save();
    const result = await Message.findOne({ _id: Msg._id }).populate(
      "senderId",
      "-password"
    );

    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

exports.fetchMessages = async (req, res) => {
  const { chatId } = req.params;
  try {
    const result = await Message.find({ chatId }).populate(
      "senderId",
      "-password"
    );

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};
