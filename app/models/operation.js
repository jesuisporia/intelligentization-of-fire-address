const mongoose = require('mongoose');

const operationSchema = new mongoose.Schema({
  operationId: { type: String, unique: true },  // شناسه منحصر به فرد برای عملیات
  operationName: String,  // نام عملیات
  startDateTime: Date,  // تاریخ و زمان شروع عملیات
  endDateTime: Date,  // تاریخ و زمان پایان عملیات
  operationType: String,  // نوع عملیات
  location: String,  // محل وقوع عملیات
  operationStatus: { type: String, enum: ['In Progress', 'Completed', 'Suspended', 'Cancelled'] },  // وضعیت عملیات
  numberOfFirefighters: Number,  // تعداد آتش‌نشان‌ها
  numberOfEquipment: Number,  // تعداد تجهیزات
  specialEquipmentUsed: [String],  // تجهیزات ویژه استفاده شده
  incidentType: String,  // نوع حادثه
  causeOfIncident: String,  // دلیل وقوع حادثه
  humanCasualties: String,  // آسیب‌های انسانی
  propertyDamage: String,  // آسیب به اموال
  hazardousMaterialsInvolved: String,  // مواد خطرناک درگیر
  operationDescription: String,  // شرح عملیات
  instructionsAndPlanning: String,  // دستورالعمل‌ها و برنامه‌ریزی
  arrivalTimeAtScene: Date,  // زمان رسیدن به محل حادثه
  initialAssessmentReports: String,  // گزارش‌های ارزیابی اولیه
  collaborationWithOtherAgencies: String,  // همکاری با دیگر نهادها
  resultsAndPerformanceEvaluation: String,  // ارزیابی عملکرد و نتیجه‌گیری
  successOrFailureFactors: String,  // عوامل موفقیت یا شکست
  completionReports: String,  // گزارش تکمیلی
  numberOfSimilarMissions: Number,  // تعداد ماموریت‌های مشابه
  imagesAndVideos: [String],  // تصاویر و ویدئوها
  insuranceReports: [String],  // گزارش‌های مرتبط با بیمه
  reportCreated: { type: Boolean, default: false },  // گزارش ایجاد شده
  timestamp: { type: Date, default: Date.now },  // زمان ایجاد عملیات
  stationId: { type: mongoose.Schema.Types.ObjectId, ref: 'Station' }  // ارتباط با ایستگاه
});

const Operation = mongoose.model('Operation', operationSchema);
module.exports = Operation;
