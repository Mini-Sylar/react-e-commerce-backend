const User = require("../models/User");
const jwt = require("jsonwebtoken");

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
};

const authController = {
  register: async (req, res) => {
    try {
      const { email, password, username } = req.body;
      const user = await User.create({ email, password, username });
      const token = createToken(user._id);
      res.cookie("userToken", token, {
        httpOnly: true,
        maxAge: 7 * 24 * 60 * 60 * 1000,
        sameSite: "None",
        secure: true,
      });
      res.status(201).json({
        user: {
          id: user._id,
          username: user.username,
        },
      });
    } catch (error) {
      res.status(400).json({
        error: error.message,
      });
    }
  },
  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await User.login(email, password);
      const token = createToken(user._id);
      res.cookie("userToken", token, {
        httpOnly: true,
        maxAge: 7 * 24 * 60 * 60 * 1000,
        sameSite: "None",
        secure: true,
      });
      res.status(200).json({
        user: {
          id: user._id,
          username: user.username,
        },
      });
    } catch (error) {
      res.status(404).json({
        error: error.message,
      });
    }
  },
  logout: async (req, res) => {
    try {
      res.cookie("userToken", "", { maxAge: 1 });
      res.status(200).json({ message: "User Logged Out" });
    } catch (error) {
      res.status(500).json(error);
    }
  },
};

module.exports = authController;
