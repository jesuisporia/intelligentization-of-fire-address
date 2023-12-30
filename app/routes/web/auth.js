const express = require('express');
const router = express.Router();
const passport = require('passport');

// Controllers
const adminController = require('./../../http/controllers/admin/adminController');

const loginController = require('./../../http/controllers/auth/loginController');
const registerController = require('./../../http/controllers/auth/registerController');
const forgotPasswordController = require('./../../http/controllers/auth/forgotPasswordController');
const resetPasswordController = require('./../../http/controllers/auth/resetPasswordController');


// validators 
const registerValidator = require('./../../http/validators/registerValidator');
const loginValidator = require('./../../http/validators/loginValidator');
// const forgotPasswordValidator = require('app/http/validators/forgotPasswordValidator');
// const resetPasswordValidator = require('app/http/validators/resetPasswordValidator');

 
// Home Routes
router.post('/a' , loginController.a);
router.get('/login' , loginController.showLoginForm);
router.post('/login' , loginValidator.handle() , loginController.loginProccess);

router.get('/register' , registerController.showRegsitrationForm);
router.post('/register'  , registerValidator.handle(), registerController.registerProccess);

router.get('/password/reset' , forgotPasswordController.showForgotPassword);
router.post('/password/email' , forgotPasswordController.sendPasswordResetLink);

router.get('/password/reset/:token' , resetPasswordController.showResetPassword);
router.post('/password/reset'  , resetPasswordController.resetPasswordProccess);


module.exports = router;