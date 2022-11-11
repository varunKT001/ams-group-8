const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const ErrorHandler = require('../utils/ErrorHandler');
const catchAsyncError = require('../middleware/CatchAsyncErrors');
const { sendToken } = require('../utils/jwt');
const roles = require('../config/roles');
const Attendance = require('../models/attendanceModel');

exports.markAttendance = catchAsyncError(async (req, res, next) => {
  const { userId } = req.params;
  const user = await User.findById(userId);
  if (!user) {
    return next(new ErrorHandler('User not found!'), 400);
  }
  const attendanceEntry = await Attendance.create({ userId });
  return res.status(200).json({
    success: true,
    message: 'Attendance marked successfully',
  });
});
