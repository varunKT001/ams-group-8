const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const ErrorHandler = require('../utils/ErrorHandler');
const catchAsyncError = require('../middleware/CatchAsyncErrors');
const { sendToken } = require('../utils/jwt');
const roles = require('../config/roles');

exports.registerUser = catchAsyncError(async (req, res, next) => {
  const {
    _id,
    name,
    email,
    role,
    dob,
    rollNumber,
    department,
    phoneNumber,
    address,
  } = await User.create(req.body);
  res.status(200).json({
    success: true,
    data: {
      _id,
      name,
      email,
      role,
      dob,
      rollNumber,
      department,
      phoneNumber,
      address,
      password: req.body.password,
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
    const {
      _id,
      name,
      email,
      role,
      dob,
      rollNumber,
      department,
      phoneNumber,
      address,
    } = item;
    return {
      _id,
      name,
      email,
      role,
      dob,
      rollNumber,
      department,
      phoneNumber,
      address,
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
  const {
    _id,
    name,
    email,
    role,
    dob,
    rollNumber,
    department,
    phoneNumber,
    address,
  } = user;
  res.status(200).json({
    success: true,
    data: {
      _id,
      name,
      email,
      role,
      dob,
      rollNumber,
      department,
      phoneNumber,
      address,
    },
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

exports.updateUser = catchAsyncError(async (req, res, next) => {
  const { role } = req.body;
  if (!req.params.id) {
    return next(new ErrorHandler('User not found', 400));
  }
  if (role && !roles.includes(role)) {
    return next(new ErrorHandler('Invalid: data invalid', 400));
  }
  let user = await User.findById(req.params.id);
  if (!user) {
    return next(new ErrorHandler('User not found', 200));
  }
  if (role && user.email === req.user.email) {
    return next(new ErrorHandler('Cannot change role for self', 400));
  }
  const newUser = await User.findByIdAndUpdate(
    { _id: req.params.id },
    req.body,
    { new: true }
  );
  res.status(200).json({
    success: true,
    data: newUser,
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
