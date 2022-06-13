const router = require('express').Router();
const authController = require('../controllers/auth.controller');
const userController = require('../controllers/user.controller');

//for register
router.post("/signup", authController.signUp);
router.post("/signin", authController.signIn);
router.get("/logout", authController.logout);

// get all users
router.get('/', userController.getAllUsers);
router.get('/:id', userController.userData);
router.put('/:id', userController.updateUserData);
router.delete('/:id', userController.deleteUser);


module.exports = router;