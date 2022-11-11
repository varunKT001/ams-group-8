// create jwt token and save as a cookie
exports.sendToken = (user, statusCode, res) => {
  const token = user.getJwtToken();
  const options = {
    expires: new Date(
      Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };

  if (process.env.NODE_ENV === 'production') {
    options.sameSite = 'none';
    options.secure = true;
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

  res.status(statusCode).cookie('token', token, options).json({
    success: true,
    data: {
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
};
