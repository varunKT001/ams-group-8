const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide a name'],
    maxlength: [30, 'Name cannot exceed 30 characters'],
    minLength: [4, 'Name must be atleast 4 characters long'],
  },
  email: {
    type: String,
    required: [true, 'Please provide an email'],
    unique: true,
    validate: [validator.isEmail, 'Please enter a valid email'],
  },
  role: {
    type: String,
    default: 'user',
  },
  password: {
    type: String,
    required: [true, 'Please provide a password'],
    minLength: [8, 'Password must be atleast 8 characters long'],
    select: false,
  },
  dob: {
    type: Date,
    required: [true, 'Please provide a date of birth'],
  },
  rollNumber: {
    type: String,
    required: [true, 'Please provide a roll number'],
  },
  department: {
    type: String,
    required: [true, 'Please provide a department'],
  },
  phoneNumber: {
    type: String,
    required: [true, 'Please provide a phone number'],
  },
  address: {
    type: String,
    require: [true, 'Please provide an address'],
  },
});

// checking for changed password
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }
  this.password = await bcrypt.hash(this.password, 10);
});

// creating jsonwebtoken
userSchema.methods.getJwtToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

// comparing passwords
userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', userSchema);
