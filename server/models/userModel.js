const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");

const DEFAULT_IMAGE =
  "https://img.freepik.com/free-vector/cute-penguin-wearing-earmuff-cartoon_138676-3029.jpg";

const UserSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      required: true,
    },

    profile: {
      type: String,
      default: DEFAULT_IMAGE,
    },
  },
  {
    timestamps: true,
    collection: "users",
  }
);

UserSchema.statics.register = async function (
  username,
  email,
  password,
  profile
) {
  //validation
  if (!username || !email || !password) {
    throw Error("All fields must be filled");
  }

  const emailExists = await this.findOne({ email });
  const usernameExists = await this.findOne({ username });

  if (emailExists) {
    throw Error("The email is already registered!");
  }

  if (usernameExists) {
    throw Error("The username is already in use!");
  }

  if (!validator.default.isEmail(email)) {
    throw Error("Invalid email");
  }

  if (!validator.default.isStrongPassword(password)) {
    throw Error("Your password is not strong enough");
  }

  if (profile === "" || profile === undefined || profile === null) {
    profile = DEFAULT_IMAGE;
  }

  const saltRounds = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, saltRounds);

  const user = await this.create({
    username,
    email,
    password: hashedPassword,
    profile,
  });

  return user;
};

//static login method
UserSchema.statics.login = async function (username, password) {
  //validation
  if (!username || !password) {
    throw Error("All fields must be filled");
  }

  const user = await this.findOne({ username });

  if (!user) {
    throw Error("The username is incorrect or not registered!");
  }

  const match = await bcrypt.compare(password, user.password);

  if (!match) {
    throw Error("The password is incorrect!");
  }

  return user;
};

const User = mongoose.model("User", UserSchema);
module.exports = User;
