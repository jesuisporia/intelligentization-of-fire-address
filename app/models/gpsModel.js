const mongoose = require('mongoose');

// مدل اطلاعات راننده و خودرو
const vehicleSchema = new mongoose.Schema({
  vehicleId: { type: String, required: true, unique: true },  // شناسه خودرو
  model: { type: String, required: true },  // مدل خودرو
  drivers: [{                          // اطلاعات رانندگان (چندین راننده برای هر خودرو)
    driverId: { type: String, required: true },  // شناسه راننده
    name: { type: String, required: true } // نام راننده
  }],
  lastOilChange: { type: Date, required: true },  // تاریخ آخرین تعویض روغن
  lastTireChange: { type: Date, required: true },  // تاریخ آخرین تعویض لاستیک
  mileage: { type: Number, default: 0 },  // مسافت پیموده‌شده (کیلومتر)
  fuelConsumption: { type: Number, default: 0 },  // مصرف سوخت (لتر)
  location: {                          // موقعیت جغرافیایی
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true }
  },
  lastReportedAt: { type: Date, default: Date.now } // زمان آخرین گزارش موقعیت
});

// مدل خودرو
const Vehicle = mongoose.model('Vehicle', vehicleSchema);

module.exports = Vehicle;
