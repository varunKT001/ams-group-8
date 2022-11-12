const User = require('../models/userModel');
const ErrorHandler = require('../utils/ErrorHandler');
const catchAsyncError = require('../middleware/CatchAsyncErrors');
const Attendance = require('../models/attendanceModel');
const { range } = require('../utils/utilities');

exports.markAttendance = catchAsyncError(async (req, res, next) => {
  const now = new Date();
  const { userId } = req.params;
  const user = await User.findById(userId);
  if (!user) {
    return next(new ErrorHandler('User not found!'), 400);
  }
  const attendanceEntry = await Attendance.find({
    userId,
    createdAt: {
      $gte: new Date(now.getFullYear(), now.getMonth(), now.getDate()),
    },
  });
  if (attendanceEntry.length > 0) {
    return next(new ErrorHandler('Attendance already marked!'), 400);
  }
  const newAttendanceEntry = await Attendance.create({ userId });
  return res.status(200).json({
    success: true,
    message: 'Attendance marked successfully',
  });
});

exports.todaysAttendance = catchAsyncError(async (req, res, next) => {
  const now = new Date();
  const attendanceEntries = await Attendance.find({
    createdAt: {
      $gte: new Date(now.getFullYear(), now.getMonth(), now.getDate()),
    },
  });
  const users = await User.find();
  const data = users.map((user) => {
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
    const isPresent = attendanceEntries.some((entry) =>
      entry.userId.equals(_id)
    );
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
      present: isPresent,
    };
  });
  res.status(200).json({
    success: true,
    data,
  });
});

exports.monthlyAttendance = catchAsyncError(async (req, res, next) => {
  const { month } = req.params;
  const now = new Date();
  const dateFilter = {
    createdAt: {
      $gte: new Date(now.getFullYear(), parseInt(month), 1),
      $lt: new Date(now.getFullYear(), parseInt(month), 30),
    },
  };
  const groupFilter = {
    _id: '$userId',
    count: { $sum: 1 },
  };
  const lookupFilter = {
    from: 'users',
    localField: '_id',
    foreignField: '_id',
    as: 'user',
  };
  const attendanceEntries = await Attendance.aggregate([
    {
      $match: dateFilter,
    },
    {
      $group: groupFilter,
    },
    {
      $lookup: lookupFilter,
    },
    {
      $unwind: '$user',
    },
  ]);
  const percentAttendance = attendanceEntries.map((entry) => {
    const average = (entry.count / now.getDate()) * 100;
    return { ...entry, average };
  });
  const users = await User.find();
  const allUsersPercentAttendance = users
    .filter(
      (user) =>
        !percentAttendance.some((entry) => entry.user._id.equals(user._id))
    )
    .map((user) => {
      return {
        _id: user._id,
        count: 0,
        average: 0,
        user,
      };
    });
  res.status(200).json({
    success: true,
    data: percentAttendance.concat(allUsersPercentAttendance),
  });
});

exports.singleUserAttendance = catchAsyncError(async (req, res, next) => {
  const now = new Date();
  const { month, userId } = req.params;
  const attendanceEntries = await Attendance.find({
    userId,
    createdAt: {
      $gte: new Date(now.getFullYear(), parseInt(month), 1),
      $lt: new Date(now.getFullYear(), parseInt(month), 30),
    },
  });
  const data = range(1, 30, 1).map((date) => {
    isPresent = attendanceEntries.some((entry) => {
      const entryDate = new Date(entry.createdAt);
      const thisDate = new Date(now.getFullYear(), parseInt(month), date);
      return (
        entryDate.getFullYear() === thisDate.getFullYear() &&
        entryDate.getMonth() === thisDate.getMonth() &&
        entryDate.getDate() === thisDate.getDate()
      );
    });
    return {
      date,
      present: isPresent,
    };
  });
  res.status(200).json({
    success: true,
    data,
  });
});
