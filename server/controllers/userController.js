const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

//Create Token
const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
};

//Registering new User
exports.RegisterNewUser = async (req, res) => {
  const { username, email, password, profile } = req.body;
  try {
    const user = await User.register(username, email, password, profile);
    //create a token
    const token = createToken(user._id);
    const responseData = {
      _id: user._id,
      username: user.username,
      email: user.email,
      profile: user.profile,
    };
    res.status(201).json({
      status: "success",
      token: token,
      data: responseData,
    });
  } catch (err) {
    res.status(400).json({
      status: "falied",
      message: err.message,
    });
  }
};

//Existing user log in
exports.LoginUser = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.login(username, password);
    const responseData = {
      _id: user._id,
      username: user.username,
      email: user.email,
      profile: user.profile,
    };
    //create a token
    const token = createToken(user._id);
    res.status(200).json({
      status: "success",
      message: "Successfully logged in",
      token: token,
      data: responseData,
    });
  } catch (error) {
    res.status(500).json({
      status: "falied",
      message: error.message,
    });
  }
};

//Searching Users
exports.searchUsers = async (req, res) => {
  try {
    const keyword = req.query.search
      ? {
          $or: [
            { username: { $regex: req.query.search, $options: "i" } },
            { email: { $regex: req.query.search, $options: "i" } },
          ],
        }
      : {};

    const users = req.query.search
      ? await User.find(keyword).find({ _id: { $ne: req.user._id } })
      : await User.find();
    res.send(users);
  } catch (error) {
    res.status(500).json({
      status: "falied",
      message: error.message,
    });
  }
};

//Search User By Id
exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    res.status(200).json({
      status: "success",
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      status: "falied",
      message: error.message,
    });
  }
};
