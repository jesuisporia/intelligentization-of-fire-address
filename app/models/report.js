const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema({
    operationId: { type: mongoose.Schema.Types.ObjectId, required: true }, // شناسه عملیات
    operation: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Operation', required: true }], // چندین ایستگاه
    stationIds: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Station', required: true }], // چندین ایستگاه
    firefighters: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }], // آتش‌نشان‌ها
    operationType: { type: String, required: true }, // نوع حادثه (حریق، تصادف و ...)
    incidentLocation: {
        address: { type: String, required: true }, // آدرس حادثه
        coordinates: {
            latitude: { type: Number, required: true },
            longitude: { type: Number, required: true }
        }
    },
    startTime: { type: Date, required: true }, // زمان شروع عملیات
    endTime: { type: Date }, // زمان پایان عملیات
    duration: { type: Number }, // مدت زمان عملیات (به دقیقه)
    vehiclesUsed: [{ type: String }], // وسایل نقلیه مورد استفاده
    equipmentUsed: [{ type: String }], // تجهیزات استفاده‌شده
    casualties: {
        civiliansInjured: { type: Number, default: 0 }, // تعداد مجروحان غیرنظامی
        firefightersInjured: { type: Number, default: 0 }, // تعداد مجروحان آتش‌نشان
        fatalities: { type: Number, default: 0 } // تعداد فوتی‌ها
    },
    estimatedDamage: { type: Number, default: 0 }, // میزان خسارت مالی (به تومان)
    collaboratingOrganizations: [{ type: String }], // سازمان‌های امدادی دیگر
    summary: { type: String, required: true }, // خلاصه گزارش عملیات
    recommendations: { type: String }, // پیشنهادات و نکات بهبود
    operationPhotos: [{ type: String }], // لینک تصاویر عملیات
    createdAt: { type: Date, default: Date.now } // تاریخ ثبت گزارش
});

const Report = mongoose.model('Report', reportSchema);
module.exports = Report;
