const express = require('express');
const router = express.Router();
const rateLimit = require("express-rate-limit");
const User = require('./../../models/user')


// Controllers
const homeController = require('./../../http/controllers/homeController');


const userController = require('./../../http/controllers/userController');
const chateController = require('./../../http/controllers/chateController');
const reportController = require('./../../http/controllers/reportController')
const tiketController = require('./../../http/controllers/tiketController')
const webrtcController = require('./../../http/controllers/webrtcController')
const videostreamController = require('./../../http/controllers/videostreamController')

const reportValidator = require('./../../http/validators/reportValidator')





const redirectIfNotAuthenticated = require('./../../http/middleware/redirectIfNotAuthenticated');
router.get('/logout', (req, res) => {
  req.logout();
  res.clearCookie('remember_token');
  res.redirect('/home');
});
// Home Routes


const createAccountLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour window
  max: 200, // start blocking after 5 requests
  message: " لطفاً پس از یک ساعت دوباره امتحان کنید.درخواست شما بیش از حد مجاز میباشد."
});


router.get('/' , homeController.home)

// // Report Routes
router.get('/dashboard/report'  ,reportController.index);
router.get('/dashboard/report/create' , reportController.create)
router.post('/dashboard/report/store' , reportValidator.handle() ,redirectIfNotAuthenticated.handle , reportController.store)
router.get('/dashboard/report/:id' ,redirectIfNotAuthenticated.handle , reportController.single)
router.get('/dashboard/report/:id/edit', reportController.edite)
router.post('/dashboard/report/update/:id', reportController.update)

// // Tiket routes
router.get('/dashboard/tiket' ,redirectIfNotAuthenticated.handle , tiketController.index)

router.get('/dashboard' ,  userController.dashboard);
router.get('/dashboard/one',redirectIfNotAuthenticated.handle ,  userController.one);
router.get('/dashboard/seven',redirectIfNotAuthenticated.handle ,  userController.seven);
router.get('/dashboard/history/login',redirectIfNotAuthenticated.handle ,  userController.historylogin);


router.get('/dashboard/endofoperation/:token',redirectIfNotAuthenticated.handle ,userController.endofoperation)

router.get('/dashboard/hydrant' ,redirectIfNotAuthenticated.handle , homeController.hydrant)
router.get('/dashboard/videostrem' ,redirectIfNotAuthenticated.handle , videostreamController.index)

router.get('/home' , homeController.home)
router.get('/:token', homeController.index);
router.post('/resive/map', homeController.map);










module.exports = router;