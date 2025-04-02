const express = require('express');
const router = express.Router();

// Controllers
const adminController = require('./../../http/controllers/admin/adminController');
const stationController = require('./../../http/controllers/admin/stationController');
const widgetController = require('./../../http/controllers/admin/widgetController');
const gisController = require('./../../http/controllers/admin/gisController');
const firemanController = require('./../../http/controllers/admin/firemanController');
const managerController = require('./../../http/controllers/admin/managerController')
const firefighterController = require('./../../http/controllers/admin/firefighterController')

const categoryController = require('./../../http/controllers/admin/categoryController')
const sharvandController = require('./../../http/controllers/admin/sharvandController');
const payamController = require('./../../http/controllers/admin/payamController')
const reportController = require('./../../http/controllers/admin/reportController')
const contactController = require('./../../http/controllers/admin/contactController')
const permissionController = require('./../../http/controllers/admin/permissionController');
const roleController = require('./../../http/controllers/admin/roleController');
const accidentController = require('./../../http/controllers/admin/accidentController')
const daragatController = require('./../../http/controllers/admin/daragatController')
const activityController = require('./../../http/controllers/admin/activityController')
const { isFirefighter, isStationChief } = require('./../../http/middleware/auth');
const OperationController = require('./../../http/controllers/admin/operationController');
const AuthMiddleware = require('./../../http/middleware/auth');

const { assignShift, getShiftsForDate } = require('./../../http/controllers/admin/shiftController');


const Activity = require('../../models/activity');

const educationalValidator  = require('./../../http/validators/educationalValidator')


router.get('/logout' , (req ,res) => {
    req.logout();
    res.clearCookie('remember_token');
    res.redirect('/');
});




// Helpers
const upload = require('./../../helpers/uploadImageUser');
const gate = require('./../../helpers/gate');
// Middlewares
const convertFileToField = require('./../../http/middleware/convertFileToField');

router.get('/gis' , gisController.index)
router.get('/gis/live' , gisController.live)

router.use((req , res , next) => {
    res.locals.layout = "admin/master";
    next();
})






router.get('/firefighter/:id' , firefighterController.info)





router.get('/gis/info' , gisController.info)
router.get('/gis/information' , gisController.information)
router.get('/gis/hydrant' , gisController.hydrant)
router.post('/gis/hydrant/store' , gisController.store)





// router.post('/start', AuthMiddleware.isAuthenticated, OperationController.startOperation);
// router.post('/end', AuthMiddleware.isAuthenticated, OperationController.endOperation);
// router.get('/report/:operationId', AuthMiddleware.isAuthenticated, OperationController.getOperationReportLink);
// router.get('/report/view/:linkId', OperationController.getReportByLink);

router.post('/start', OperationController.startOperation);
router.post('/end', OperationController.endOperation);
router.get('/report/:operationId', OperationController.getOperationReportLink);
router.get('/report/view/:linkId', OperationController.getReportByLink);



// تخصیص شیفت به آتش‌نشان
router.post('/shift/assign', isStationChief, assignShift);

// دریافت شیفت‌ها برای تاریخ خاص
router.get('/shift/:date', getShiftsForDate);


// category Controller
router.get('/category'   ,categoryController.index);
router.get('/category/create'  ,  categoryController.create);
router.post('/category/store'  , educationalValidator.handle() , categoryController.store);
router.put('/category/update/:id'  , categoryController.update);
router.get('/category/:id/edit' , categoryController.edit);
router.get('/category/:id/delete',categoryController.destroy );


// activity
router.get('/activity' ,activityController.index);

//contactController
router.get('/contact', contactController.index)

//daragatController
router.get('/daragat', daragatController.index)
router.get('/insert/daragat', daragatController.insertdarage)
router.get('/insert/education', daragatController.inserteducation)
router.get('/insert/sanavat', daragatController.insertsanavat)


// reportController 
router.get('/report', reportController.index)
router.get('/report/create', reportController.create)
router.get('/report/:id/edit', reportController.edite)
router.post('/report/update', reportController.update)
router.post('/report/:id/delete', reportController.delete)

router.get('/report/info', reportController.info)
router.get('/report/search', reportController.search)

//payamController 
router.get('/payam', payamController.index)

// shahevandCondtroller
router.get('/sharvand' , sharvandController.index);





// accident
router.get('/accident' , accidentController.index)
router.get('/accident/create' , accidentController.create)
router.get('/accident/:id/information' , accidentController.information)
router.post('/accident/create' , upload.single('picture') , convertFileToField.handle, accidentController.store)
router.get('/accident/:id/edit' , accidentController.edit)
router.get('/accident/:id/destroy' , accidentController.destroy)



router.get('/residential/accident' , accidentController.residential)










// manager user
router.get('/manager' , managerController.index)
router.get('/manager/create' , managerController.create)
router.get('/manager/:id/information' , managerController.information)
router.post('/manager/create' , upload.single('picture') , convertFileToField.handle, managerController.store)
router.get('/manager/:id/edit' , managerController.edit)
router.get('/manager/:id/destroy' , managerController.destroy)
router.get('/manager/graphics' , managerController.graphics)


router.get('/manager/:id/toggleadmin' , managerController.toggleadmin);
router.get('/manager/:id/addrole' , managerController.addrole);
router.put('/manager/:id/addrole' , managerController.storeRoleForUser);


// Fireman user
router.get('/user' , firemanController.index)
router.get('/user/create' , firemanController.create)
router.get('/user/:id/information' , firemanController.information)
router.post('/user/create' , upload.single('picture') , convertFileToField.handle, firemanController.store)
router.get('/user/:id/edit' , firemanController.edit)
router.get('/user/graphics' , firemanController.graphics)

// Report Controller

// Admin Routes
router.get('/home', adminController.index);
router.get('/fire', adminController.fire);
router.get('/reports', adminController.reports);
router.post('/phone', adminController.phone);
router.get('/one/:id/:token', adminController.one);
router.get('/seven/:id/:token', adminController.seven);
router.get('/:token', adminController.fire);


router.get('/suggestion',adminController.suggestion);
router.post('/suggestion',adminController.storesuggestion);

router.get('/report-registration',adminController.reportRegistration);
router.post('/report-registration',adminController.storereportRegistration);




router.get('/list/stations' ,  stationController.index);
router.get('/stations/:id/details' ,stationController.details);

router.get('/station/create' , stationController.create);
router.get('/station/:id/edit' , stationController.edit);
router.post('/station/update/:id' , stationController.update);

router.post('/station/create' , stationController.store);
router.get('/station/createpayam/:id' , stationController.createpayam);
router.post('/station/sendpayam',stationController.sendpayam);


router.delete('/Station/:id' , stationController.destroy);
router.get('/Station/:id/toggleadmin' , stationController.toggleadmin);
router.get('/Station/:id/addrole' , stationController.addrole);
router.post('/Station/:id/addrole' ,stationController.storeRoleForUser);




router.get('/widget', widgetController.index);








// Permission Routes
router.get('/users/permissions' , permissionController.index);
router.get('/users/permissions/create' , permissionController.create);
router.post('/users/permissions/create' ,  permissionController.store );
router.get('/users/permissions/:id/edit' , permissionController.edit);
router.put('/users/permissions/:id' ,  permissionController.update );
router.delete('/users/permissions/:id' , permissionController.destroy);

// Role Routes
router.get('/users/roles' , roleController.index);
router.get('/users/roles/create' , roleController.create);
router.post('/users/roles/create' ,  roleController.store );
router.get('/users/roles/:id/edit' , roleController.edit);
router.put('/users/roles/:id' , roleController.update );
router.delete('/users/roles/:id' , roleController.destroy);



module.exports = router;