// routes/gpsRoutes.js
const express = require("express");
const router = express.Router();
const gpsController = require("./../../http/controllers/gps/gpsController");

// gpsController.scheduleSimulateDatas();

router.post("/gps", gpsController.saveGPSData);

router.get("/get-latest-gps", gpsController.getGPSData);

router.get('/gps-show-report-data', gpsController.getSHOWGPSREPORTData);
router.get('/gps-report-data', gpsController.getGPSREPORTData);
router.get('/gps-fuel-consumption', gpsController.fuelconsumption);

// اینو باید یه صفحه بسازم بتونم نمایش بدم
router.get('/gps-report-data', gpsController.getGPSReportconsumption);


module.exports = router;