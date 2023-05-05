const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const validateToken = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer ")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      //decodes token id
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      const { _id } = decoded;

      req.user = await User.findOne({ _id }).select("-password");

      next();
    } catch (error) {}
  } else {
    res.status(401);
    throw new Error("Not authorized, no token found");
  }
};

module.exports = { validateToken };
