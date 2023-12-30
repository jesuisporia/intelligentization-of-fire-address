const express = require('express');
const router = express.Router();
const Mapchart = require('./../../models/mapchart')
var schedule = require('node-schedule');

// Middlewares
const redirectIfAuthenticated = require('./../../http/middleware/redirectIfAuthenticated');
const redirectIfNotAdmin = require('./../../http/middleware/redirectIfNotAdmin');
const errorHandler = require('./../../http/middleware/errorHandler');


// var ami = new require('asterisk-manager')('5038','192.168.1.50','w','qwe123');
// // In case of any connectiviy problems we got you coverd.
// ami.keepConnected(function(evt){
//     console.log('resiver')
//     console.log(evt)
// });

// // Listen for any/all AMI events.
// ami.on('managerevent', function(evt) {
//     console.log('resiver')
//     console.log(evt)
// });




// var j = schedule.scheduleJob('42 * * * * *',async function () {

//     var newMapchart = new Mapchart({
//         lat:'',
//         lng:'',
//         token:'',
//         visit:false,
//         approved:false,
//         notification:false,
//         address:'',
//         ip:'',
//         count:0,
//     })

//     await newMapchart.save();

//     console.log('crrrrrrrrrrrrrreate')

// });





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