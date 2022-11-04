const router = require('express').Router();

const attendanceController = require('../controllers/attendanceController');

const auth = require('../middleware/Auth');

router.route('/new/:userId').post(attendanceController.markAttendance);
router.route('/today').get(attendanceController.todaysAttendance);
router.route('/monthly/:month').get(attendanceController.monthlyAttendance);
router
  .route('/user/:userId/:month')
  .get(attendanceController.singleUserAttendance);

module.exports = router;
