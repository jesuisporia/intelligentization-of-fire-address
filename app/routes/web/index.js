const express = require('express');
const router = express.Router();
const Mapchart = require('./../../models/mapchart')
var schedule = require('node-schedule');
const gpsRoutes = require("./../../routes/web/gpsRoutes");

// Middlewares
const redirectIfAuthenticated = require('./../../http/middleware/redirectIfAuthenticated');
const redirectIfNotAdmin = require('./../../http/middleware/redirectIfNotAdmin');
const errorHandler = require('./../../http/middleware/errorHandler');


router.use("/gps", gpsRoutes);


router.use(async (req, res, next) => {

    var date = Date();
    res.locals = {

        date
    };
    next();
})





const homeController = require('./../../http/controllers/homeController');




// Auth Router
const authRouter = require('./auth');
// router.use('/auth', redirectIfAuthenticated.handle, authRouter);
router.use('/auth' , authRouter);


// Home Router
const homeRouter = require('./home');
router.use('/', homeRouter);

// Admin Router
const adminRouter = require('./admin');
// router.use('/admin', redirectIfNotAdmin.handle, adminRouter);

router.use('/admin' , adminRouter);






// Handle Errors
router.all('*', errorHandler.error404);
router.use(errorHandler.handler)


module.exports = router;