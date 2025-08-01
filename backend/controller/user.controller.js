const userModel = require("../model/user.model");
const userService = require("../services/user.services");
const { validationResult } = require("express-validator");
const blacklistTokenModel = require('../model/blacklistToken.model')

module.exports.registerUser = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { fullName, email, password } = req.body;

    const isUserAlreadyExist = await userModel.findOne({ email });
    
    if (isUserAlreadyExist) {
      return res.status(400).json({ message: 'User already exist' });
    }
    const hashedPassword = await userModel.hashPassword(password);

    const user = await userService.createUser({
      firstName: fullName.firstName,
      lastName: fullName.lastName,
      email,
      password: hashedPassword,
    });

    const token = user.generateAuthToken();
    res.status(201).json({token, user});
  } catch (err) {
    next(err);
  }
};

module.exports.loginUser = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email }).select("+password");

    if (!user) {
      return res.status(401).json({ message: "Invalid Email or Password" });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid Email or Password" });
    }

    const token = user.generateAuthToken();

    res.cookie("token", token);
    res.status(200).json({token, user});
  } catch (err) {
    next(err);
  }
};

module.exports.getUserProfile = async (req, res, next) => {
  res.status(200).json(req.user);
};

module.exports.logoutUser = async (req, res, next) => {
  res.clearCookie("token");
  const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
  await blacklistTokenModel.create({token});

  res.status(200).json({ message: "Logged Out Successfully" });
};
