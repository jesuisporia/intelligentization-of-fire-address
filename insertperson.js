const mongoose = require('mongoose');
const { faker } = require('@faker-js/faker');
const Station = require('./app/models/station');

// اتصال به دیتابیس MongoDB
mongoose.connect('mongodb://localhost/admin', { useNewUrlParser: true, useUnifiedTopology: true });

// مدل Firefighter
const firefighterSchema = new mongoose.Schema({
    personalPhoto: String,
    employeeNumber: String,
    hireDate: Date,
    firstName: String,
    lastName: String,
    fatherName: String,
    idNumber: String,
    nationalId: String,
    employmentType: String,
    birthPlace: String,
    birthDate: Date,
    maritalStatus: String,
    numberOfChildren: Number,
    jobGroup: { type: Number, min: 7, max: 30 },
    jobPosition: String,
    organizationalPost: String,
    educationLevel: String,
    major: String,
    insuranceNumber: String,
    insuranceType: String,
    eyeColor: String,
    height: Number,
    weight: Number,
    skinColor: String,
    training: [String],
    religion: String,
    sect: String,
    retirementStatus: String,
    gender: String,
    bloodGroup: String,
    address: String,
    contactNumber: String,
    email: { type: String, unique: true },
    city: String,
    country: String,
    district: String,
    additionalInfo: String,
    stations: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Station' }],
    shifts: [String],
    endDate: Date,
    trainingDocuments: [String],
    firefighterSpecialtyCourses: [String],
    certificates: [String],
    skillsAndAbilities: [String],
    medicalHistory: [String],
    publicPerformanceEvaluations: [String],
    bossPerformanceEvaluations: [String],
    crisisZoneTravels: [String],
    internationalMissions: [String],
    successfulAndFailedOperations: [String],
    salary: Number,
}, { timestamps: true });

const Firefighter = mongoose.model('Firefighter', firefighterSchema);

// پیدا کردن ایستگاه‌ها و اختصاص دادن به آتش‌نشان‌ها
const createFirefightersAndAssignStations = async (firefighterCount) => {
    try {
        // دریافت ایستگاه‌ها از دیتابیس
        const stations = await Station.find();
        if (stations.length === 0) {
            console.log('ایستگاه‌ها یافت نشد');
            return;
        }

        // ایجاد آتش‌نشان‌ها
        const firefighters = [];
        for (let i = 0; i < firefighterCount; i++) {
            const firefighter = new Firefighter({
                personalPhoto: faker.image.avatar(),
                employeeNumber: faker.string.uuid(),
                hireDate: faker.date.past(5),
                firstName: faker.person.firstName(),
                lastName: faker.person.lastName(),
                fatherName: faker.person.firstName(),
                idNumber: faker.number.int(),
                nationalId: faker.number.int(),
                employmentType: 'Full-time',
                birthPlace: 'تهران',
                birthDate: faker.date.past(30),
                maritalStatus: 'Single',
                numberOfChildren: 0,
                jobGroup: 12,
                jobPosition: 'آتش‌نشان',
                organizationalPost: 'آتش‌نشان',
                educationLevel: 'کارشناسی',
                major: 'تکنولوژی آتش‌نشانی',
                insuranceNumber: faker.number.int(),
                insuranceType: 'تامین اجتماعی',
                eyeColor: 'قهوه‌ای',
                height: 180,
                weight: 75,
                skinColor: 'روشن',
                training: ['آموزش آتش‌نشانی پایه', 'آموزش آتش‌نشانی پیشرفته'],
                religion: 'اسلام',
                sect: 'شیعه',
                retirementStatus: 'فعال',
                gender: 'مرد',
                bloodGroup: 'O+',
                address: faker.location.streetAddress(),
                contactNumber: faker.phone.number(),
                email: faker.internet.email(),
                city: faker.location.city(),
                country: faker.location.country(),
                district: faker.location.state(),
                additionalInfo: 'هیچ اطلاعات اضافی',
                stations: [],  // به ایستگاه‌ها هیچ ای‌دی اضافه نشده است
                shifts: ['صبح', 'شب'],
                endDate: null,
                trainingDocuments: ['گواهی‌نامه آموزش 1'],
                firefighterSpecialtyCourses: ['دوره تخصصی نجات'],
                certificates: ['گواهی کمک‌های اولیه'],
                skillsAndAbilities: ['نجات', 'آتش‌نشانی'],
                medicalHistory: ['سالم'],
                publicPerformanceEvaluations: ['عالی'],
                bossPerformanceEvaluations: ['خوب'],
                crisisZoneTravels: ['ندارد'],
                internationalMissions: ['ندارد'],
                successfulAndFailedOperations: ['3 موفق', '1 ناموفق'],
                salary: 3000,
            });

            firefighters.push(firefighter);
        }

        // ذخیره آتش‌نشان‌ها به صورت همزمان
        await Firefighter.insertMany(firefighters);
        console.log(`${firefighterCount} آتش‌نشان با موفقیت ایجاد شد`);

        // اختصاص آتش‌نشان‌ها به ایستگاه‌ها به ترتیب
        let currentFirefighterIndex = 0;
        for (let i = 0; i < stations.length; i++) {
            const station = stations[i];
            // انتخاب 20 آتش‌نشان برای این ایستگاه
            const assignedFirefighters = firefighters.slice(currentFirefighterIndex, currentFirefighterIndex + 20);
            
            // اختصاص آتش‌نشان‌ها به ایستگاه
            station.firefighters = assignedFirefighters.map(firefighter => firefighter._id);

            // اختصاص ایستگاه به آتش‌نشان‌ها
            assignedFirefighters.forEach(firefighter => {
                firefighter.stations.push(station._id);
                firefighter.save();
            });

            // ذخیره ایستگاه با آتش‌نشان‌ها
            await station.save();
            console.log(`آتش‌نشان‌ها به ایستگاه ${station.name} اختصاص داده شدند`);

            // بروزرسانی ایندکس آتش‌نشان‌ها برای ایستگاه‌های بعدی
            currentFirefighterIndex += 20;
        }
    } catch (error) {
        console.error('خطا در ایجاد و اختصاص آتش‌نشان‌ها:', error);
    }
};

// ایجاد 500 آتش‌نشان و اختصاص به ایستگاه‌ها
createFirefightersAndAssignStations(500);
