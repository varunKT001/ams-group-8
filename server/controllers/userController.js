const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const ErrorHandler = require('../utils/ErrorHandler');
const catchAsyncError = require('../middleware/CatchAsyncErrors');
const { sendToken } = require('../utils/jwt');

exports.registerUser = catchAsyncError(async (req, res, next) => {
  const { name, email, password, role } = req.body;
  if (!name || !email || !password) {
    return next(new ErrorHandler('Missing fields', 400));
  }
  const user = await User.create({
    name,
    email,
    role,
    password,
  });
  res.status(200).json({
    success: true,
    data: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  });
});

exports.loginUser = catchAsyncError(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new ErrorHandler('Missing fields', 400));
  }
  const user = await User.findOne({ email }).select('+password');
  if (!user) {
    return next(new ErrorHandler('Invalid email or password', 401));
  }
  const isPasswordMatched = await user.comparePassword(password);
  if (!isPasswordMatched) {
    return next(new ErrorHandler('Invalid email or password', 401));
  }
  sendToken(user, 200, res);
});

exports.logoutUser = catchAsyncError(async (req, res, next) => {
  res.cookie('token', null, {
    expires: new Date(Date.now()),
    httpOnly: true,
    sameSite: 'none',
    secure: true,
  });
  res.status(200).json({
    success: true,
    message: 'Logged Out',
  });
});

exports.getAllUserDetails = catchAsyncError(async (req, res, next) => {
  const user = await User.find();
  const userData = user.map((item) => {
    return {
      id: item._id,
      name: item.name,
      email: item.email,
      role: item.role,
    };
  });
  res.status(200).json({
    success: true,
    data: userData,
  });
});

exports.getSingleUserDetails = catchAsyncError(async (req, res, next) => {
  if (!req.params.id) {
    return next(new ErrorHandler('User not found', 400));
  }
  const user = await User.findById(req.params.id);
  if (!user) {
    return next(new ErrorHandler('User not found', 200));
  }
  const userData = {
    id: user._id,
    name: user.name,
    email: user.email,
  };
  res.status(200).json({
    success: true,
    data: userData,
  });
});

exports.sendCurrentUser = catchAsyncError(async (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    return next(new ErrorHandler('User not found', 400));
  }
  const decodedData = await jwt.verify(token, process.env.JWT_SECRET);
  const user = await User.findById(decodedData.id);
  if (!user) {
    new ErrorHandler('User not found', 401);
  }
  sendToken(user, 200, res);
});

exports.updateUserRole = catchAsyncError(async (req, res, next) => {
  const { role } = req.body;
  if (!req.params.id) {
    return next(new ErrorHandler('User not found', 400));
  }
  if (!role) {
    return next(new ErrorHandler('Invalid: no data provided', 400));
  }
  if (!['admin', 'user'].includes(role)) {
    return next(new ErrorHandler('Invalid: data invalid', 400));
  }
  const user = await User.findById(req.params.id);
  if (!user) {
    return next(new ErrorHandler('User not found', 200));
  }
  if (user.email === req.user.email) {
    return next(new ErrorHandler('Cannot change role for self', 400));
  }
  user.role = role;
  await user.save();
  res.status(200).json({
    success: true,
    data: user,
  });
});

exports.deleteUser = catchAsyncError(async (req, res, next) => {
  if (!req.params.id) {
    return next(new ErrorHandler('User not found', 400));
  }
  const user = await User.findById(req.params.id);
  if (!user) {
    return next(new ErrorHandler('User not found', 200));
  }
  if (user.email === req.user.email) {
    return next(new ErrorHandler('Cannot delete self', 400));
  }
  await user.remove();
  res.status(200).json({
    success: true,
    message: 'User deleted',
  });
});
