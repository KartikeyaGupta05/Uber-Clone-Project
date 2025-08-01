const captainService = require("../services/captain.services");
const captainModel = require("../model/captain.model");
const blacklistTokenModel = require('../model/blacklistToken.model')
const { validationResult } = require("express-validator");

module.exports.registerCaptain = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { fullName, email, password, vehicle } = req.body;

    const isCaptainAlreadyExist = await captainModel.findOne({ email });

    if (isCaptainAlreadyExist) {
      return res.status(400).json({ message: "Captain already exist" });
    }

    const hashedPassword = await captainModel.hashPassword(password);

    const captain = await captainService.createCaptain({
      firstName: fullName.firstName,
      lastName: fullName.lastName,
      email,
      password: hashedPassword,
      color: vehicle.color,
      plate: vehicle.plate,
      capacity: vehicle.capacity,
      vehicleType: vehicle.vehicleType,
    });

    const token = captain.generateAuthToken();
    res.status(201).json({ token, captain });
  } catch (err) {
    next(err);
  }
};

module.exports.loginCaptain = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { email, password } = req.body;

    const captain = await captainModel.findOne({ email }).select("+password");

    if (!captain) {
      return res.status(401).json({ message: "Invalid Email or Password" });
    }

    const isMatch = await captain.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid Email or Password" });
    }

    const token = captain.generateAuthToken();

    res.cookie("token", token);
    res.status(200).json({token, captain});
  } catch (err) {
    next(err);
  }
};

module.exports.getCaptainProfile = async (req, res, next) => {
  res.status(200).json(req.captain);
};

module.exports.logoutCaptain = async (req, res, next) => {
  const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
  await blacklistTokenModel.create({token});
  res.clearCookie("token");

  res.status(200).json({ message: "Logged Out Successfully" });
};