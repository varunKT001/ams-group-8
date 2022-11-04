const router = require('express').Router();

const userController = require('../controllers/userController');

const auth = require('../middleware/Auth');

router.route('/auth').post(userController.sendCurrentUser);

// register new user
router
  .route('/register')
  .post(
    auth.checkUserAuthentication,
    auth.checkUserPrivileges('admin'),
    userController.registerUser
  );

// login user
router.route('/login').post(userController.loginUser);

// logout user
router.route('/logout').get(userController.logoutUser);

// get all user details
router
  .route('/users')
  .get(
    auth.checkUserAuthentication,
    auth.checkUserPrivileges('admin'),
    userController.getAllUserDetails
  );

// get single user details
router
  .route('/users/:id')
  .get(
    auth.checkUserAuthentication,
    auth.checkUserPrivileges('admin'),
    userController.getSingleUserDetails
  )
  .put(
    auth.checkUserAuthentication,
    auth.checkUserPrivileges('admin'),
    userController.updateUserRole
  )
  .delete(
    auth.checkUserAuthentication,
    auth.checkUserPrivileges('admin'),
    userController.deleteUser
  );

module.exports = router;
