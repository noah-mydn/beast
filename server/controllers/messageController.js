const Message = require("../models/messageModel");
const crypto = require("crypto");

const algo = process.env.ALGO;
algo.toString();
const iv = process.env.InVec;
const secretKey = process.env.ENCRYPTION_KEY;

console.log(algo);
console.log(iv);
console.log(secretKey);

const encryptionKey = Buffer.from(process.env.ENCRYPTION_KEY, "utf-8");
if (encryptionKey.length !== 32) {
  console.log("Encryption key must be 32 bytes long");
  process.exit(1);
}

exports.addMessage = async (req, res) => {
  const { chatId, senderId, message } = req.body;

  const cipherText = crypto.createCipheriv(algo, secretKey, iv);
  let encryptedMessage = cipherText.update(message, "utf-8", "hex");
  encryptedMessage += cipherText.final("hex");

  const newMessage = new Message({
    chatId,
    senderId,
    message: encryptedMessage, // Store the encrypted message in the database
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
    const result = await Message.find({ chatId }).populate({
      path: "senderId",
      select: "-password",
    });

    //Decryption of Message
    const decryptedData = result.map((messageObj) => {
      const decipherText = crypto.createDecipheriv(algo, secretKey, iv);
      let decryptedMessage = decipherText.update(
        messageObj.message,
        "hex",
        "utf-8"
      );
      decryptedMessage += decipherText.final("utf8");
      return {
        _id: messageObj._id,
        chatId: messageObj.chatId,
        senderId: messageObj.senderId,
        message: decryptedMessage,
      };
    });

    res.status(200).json(decryptedData);
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};
