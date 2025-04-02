const mongoose = require('mongoose');
const { faker } = require('@faker-js/faker');

// اتصال به دیتابیس MongoDB
mongoose.connect('mongodb://localhost/admin', { useNewUrlParser: true, useUnifiedTopology: true });

// مدل‌های MongoDB

// مدل Operation برای ذخیره عملیات‌ها
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

// مدل Station و User مشابه کد قبلی
const stationSchema = new mongoose.Schema({
    name: String,
    shiftUsers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    operations: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Operation' }]  // اضافه کردن عملیات‌ها به ایستگاه
});

const Station = mongoose.model('Station', stationSchema);

// تابع تولید عملیات تصادفی
const generateRandomOperation = async () => {
    try {
        // انتخاب ایستگاه به صورت تصادفی
        const stationCount = await Station.countDocuments();
        const randomStationIndex = Math.floor(Math.random() * stationCount);
        const station = await Station.findOne().skip(randomStationIndex);
        const stations = await Station.find();
        if (!station) {
            console.log("Station not found");
            return;
        }

        // تولید عملیات تصادفی
        const operations = ['Fire', 'Training', 'Inspection', 'Maintenance'];
        const operationType = operations[Math.floor(Math.random() * operations.length)];
        const operationDescription = faker.lorem.sentence();

        // ایجاد شناسه منحصر به فرد برای عملیات
        const operationId = faker.string.uuid();

        // تولید زمان‌ها
        const startDateTime = faker.date.past();
        const endDateTime = faker.date.future();

        // تولید محل وقوع عملیات
        const location = faker.location.city() + ', ' + faker.location.streetAddress();

        // تعداد آتش‌نشان‌ها و تجهیزات
        const numberOfFirefighters = Math.floor(Math.random() * 10) + 1;  // حداقل 1 آتش‌نشان
        const numberOfEquipment = Math.floor(Math.random() * 5) + 1;  // حداقل 1 تجهیزات

        // تولید وضعیت عملیات
        const operationStatus = ['In Progress', 'Completed', 'Suspended', 'Cancelled'][Math.floor(Math.random() * 4)];

        // تولید نوع حادثه
        const incidentTypes = ['Fire', 'Explosion', 'Car Accident', 'Chemical Leak', 'Flood'];
        const incidentType = incidentTypes[Math.floor(Math.random() * incidentTypes.length)];

        // تولید علت حادثه
        const causeOfIncident = ['Negligence', 'Equipment Failure', 'Natural', 'Sabotage'][Math.floor(Math.random() * 4)];

        // اطلاعات مربوط به آسیب‌ها
        const humanCasualties = faker.number.int();
        const propertyDamage = faker.number.int();
        const hazardousMaterialsInvolved = faker.datatype.boolean() ? faker.lorem.word() : null;

        // تجهیزات ویژه استفاده شده
        const specialEquipmentUsed = ['Helicopter', 'Rescue Boat', 'Fire Engine'];

        // ذخیره عملیات در دیتابیس
        const operation = new Operation({
            operationId,
            operationName: operationType + ' at ' + station.name,
            startDateTime,
            endDateTime,
            operationType,
            location,
            operationStatus,
            numberOfFirefighters,
            numberOfEquipment,
            specialEquipmentUsed,
            incidentType,
            causeOfIncident,
            humanCasualties,
            propertyDamage,
            hazardousMaterialsInvolved,
            operationDescription,
            instructionsAndPlanning: 'Follow standard operating procedures.',
            arrivalTimeAtScene: startDateTime,
            initialAssessmentReports: 'Initial assessment complete.',
            collaborationWithOtherAgencies: 'Cooperation with police and ambulance.',
            resultsAndPerformanceEvaluation: 'Success with minor issues.',
            successOrFailureFactors: 'Timely response.',
            completionReports: 'Mission completed successfully.',
            numberOfSimilarMissions: 5,
            imagesAndVideos: [],
            insuranceReports: [],
            reportCreated: true,
            stationId: station._id  // ذخیره شناسه ایستگاه
        });

        // ذخیره عملیات در دیتابیس
        await operation.save();

        // اضافه کردن عملیات به ایستگاه
        station.operations.push(operation._id);
        await station.save();

        console.log(`New operation added: ${operationType} at Station ${station.name}`);
    } catch (error) {
        console.error('Error generating operation:', error);
    }
};

// اجرای تابع تولید عملیات هر یک دقیقه
setInterval(() => {
    generateRandomOperation();
}, 6); // 60000 میلی‌ثانیه = 1 دقیقه
