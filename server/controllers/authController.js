const catchAsync = require("../utils/catchAsync");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const { promisify } = require("util");

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const createSendToken = (user, statusCode, req, res) => {
  const token = signToken(user._id);
  res.status(statusCode).json({
    success: true,
    token,
    data: {
      user,
    },
  });
};

exports.signup = catchAsync(async (req, res, next) => {
  const user = await User.create(req.body);
  createSendToken(user, 201, req, res);
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email, password });
  if (!user) {
    return next(new Error("Invalid credentials"));
  }
  createSendToken(user, 200, req, res);
});

exports.logout = (req, res) => {
  res.status(200).json({ success: true });
};

exports.protect = catchAsync(async (req, res, next) => {
  let token;
  if (req.body.jwt) {
    token = req.body.jwt;
  }

  if (!token) {
    return next(new Error("No token provided"));
  }
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
  const currentUser = await User.findById(decoded.id);
  if (!currentUser) {
    return next(new Error("User no longer exists"));
  }
  res.status(200).json({
    success: true,
    data: {
      user: currentUser,
    },
  });
});
