// controllers/gpsController.js
const GPSData = require("./../../../models/gpsModel");
const {
  faker
} = require("@faker-js/faker");
const {
  getDistance
} = require('geolib');

// محدوده تقریبی خیابان‌های کرمانشاه
const streetCoordinates = [{
    latitude: 34.348,
    longitude: 47.114
  },
  {
    latitude: 34.350,
    longitude: 47.120
  },
  {
    latitude: 34.355,
    longitude: 47.110
  },
  {
    latitude: 34.360,
    longitude: 47.105
  },
  {
    latitude: 34.365,
    longitude: 47.115
  },
];

// انتخاب یک نقطه تصادفی از خیابان‌ها
function getRandomStreetPoint() {
  return streetCoordinates[Math.floor(Math.random() * streetCoordinates.length)];
}

class gpsController {
  // ذخیره‌سازی داده‌های GPS یک نقطه
  async saveGPSData(req, res) {
    try {
      const {
        latitude,
        longitude
      } = getRandomStreetPoint();
      const speed = faker.number.int({
        min: 0,
        max: 80
      });

      const gpsData = new GPSData({
        latitude,
        longitude,
        speed,
        timestamp: new Date()
      });
      await gpsData.save();

      res.status(201).json({
        message: "GPS Data saved successfully",
        data: gpsData
      });
    } catch (error) {
      res.status(500).json({
        message: "Error saving GPS data",
        error
      });
    }
  }

  async getSHOWGPSREPORTData(req, res) {

    res.render('gis/gpsreport');
  }
  async fuelconsumption(req, res) {

    res.render('gis/fuelconsumption');
  }
  // دریافت داده‌های GPS بر اساس بازه زمانی



  async getGPSREPORTData(req, res) {
    try {
      const {
        startDate,
        endDate
      } = req.query;

      // تبدیل تاریخ ورودی به Date
      const start = new Date(startDate);
      const end = new Date(endDate);

      // بررسی اینکه آیا تاریخ‌ها به درستی تبدیل می‌شوند
      console.log('start:', start, 'end:', end); // برای بررسی

      // فیلتر کردن داده‌ها بر اساس تاریخ و ساعت
      const gpsData = await GPSData.find({
        timestamp: {
          $gte: start,
          $lte: end
        } // دریافت داده‌های بین این دو زمان
      }).sort({
        timestamp: 1
      }); // مرتب‌سازی بر اساس زمان
      res.status(200).json({
        message: "GPS data within date range",
        data: gpsData,
      });
    } catch (error) {
      console.error("Error retrieving GPS data:", error); // چاپ خطای سرور
      res.status(500).json({
        message: "Error retrieving GPS data",
        error
      });
    }
  }




  // دریافت داده‌های GPS
  async getGPSData(req, res) {
    try {
      const gpsData = await GPSData.find().sort({
        timestamp: -1
      }).limit(1); // آخرین ۱۰ رکورد رو می‌گیریم
      res.status(200).json({
        message: "Latest GPS data",
        data: gpsData,
      });
    } catch (error) {
      res.status(500).json({
        message: "Error retrieving GPS data",
        error
      });
    }
  }

  // ذخیره‌سازی داده‌ها هر 5 ثانیه یک‌بار
  scheduleSimulateDatas() {
    setInterval(async () => {
      const {
        latitude,
        longitude
      } = getRandomStreetPoint();
      const speed = faker.number.int({
        min: 0,
        max: 80
      });

      const gpsData = new GPSData({
        latitude,
        longitude,
        speed,
        timestamp: new Date()
      });
      await gpsData.save();
      console.log("New GPS data point saved: ", gpsData);
    }, 5000); // هر 5 ثانیه یکبار
  }


  // محاسبه مصرف سوخت
   calculateFuelConsumption(distance) {
    const fuelConsumptionRate = 10; // مصرف سوخت فرضی: 10 لیتر در 100 کیلومتر
    return (distance * fuelConsumptionRate) / 100; // مصرف سوخت کل
  }

  // محاسبه مسافت بین نقاط GPS
   calculateTotalDistance(coords) {
    let totalDistance = 0;
    for (let i = 0; i < coords.length - 1; i++) {
      const from = coords[i];
      const to = coords[i + 1];
      totalDistance += getDistance(from, to) / 1000; // مسافت به کیلومتر
    }
    return totalDistance;
  }

  // دریافت داده‌های GPS و محاسبه مسافت و مصرف سوخت
  async getGPSReportconsumption(req, res) {
    const {
      startDate,
      endDate
    } = req.query;

    try {
      // دریافت داده‌ها از پایگاه داده
      const gpsData = await GPSData.find({
        timestamp: {
          $gte: new Date(startDate),
          $lte: new Date(endDate)
        }
      }).sort({
        timestamp: 1
      });

      if (gpsData.length < 2) {
        return res.status(400).json({
          message: 'داده‌های کافی برای محاسبه وجود ندارد'
        });
      }

      const coordinates = gpsData.map(point => ({
        latitude: point.latitude,
        longitude: point.longitude
      }));

      // محاسبه مسافت و مصرف سوخت
      const totalDistance = calculateTotalDistance(coordinates);
      const totalFuel = calculateFuelConsumption(totalDistance);

      res.status(200).json({
        message: 'مسیر با موفقیت محاسبه شد',
        data: {
          totalDistance: totalDistance.toFixed(2),
          totalFuel: totalFuel.toFixed(2)
        }
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        message: 'خطا در محاسبه مصرف سوخت'
      });
    }
  }
}

module.exports = new gpsController();