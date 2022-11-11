const router = require('express').Router();

const attendanceController = require('../controllers/attendanceController');

const auth = require('../middleware/Auth');

router.route('/new/:userId').post(attendanceController.markAttendance);

module.exports = router;
