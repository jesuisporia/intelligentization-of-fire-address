const mongoose = require('mongoose');
const faker = require('@faker-js/faker').faker;
const Report = require('./app/models/Report');
const Operation = require('./app/models/Operation');
const User = require('./app/models/firefighter');
const Station = require('./app/models/Station');

mongoose.connect('mongodb://localhost/admin', { useNewUrlParser: true, useUnifiedTopology: true });

const createReportsForOperations = async () => {
    try {
        const operations = await Operation.find({ reportCreated: false });
        if (operations.length === 0) {
            console.log('✅ همه عملیات‌ها قبلاً گزارش دریافت کرده‌اند.');
            return;
        }

        for (let operation of operations) {
            const stationId = operation.stationId;
            const station = await Station.findById(stationId);
            if (!station) {
                console.log(`🚨 ایستگاه ${stationId} پیدا نشد!`);
                continue;
            }
            
            const users = await User.find({ stations: stationId });
            if (users.length < 2) {
                console.log(`🔥 تعداد کافی مأمور آتش‌نشانی در ایستگاه ${stationId} وجود ندارد!`);
                continue;
            }
            
            const selectedFirefighters = users.sort(() => 0.5 - Math.random()).slice(0, 2);
            
            const newReport = new Report({
                operationId: operation._id,
                stationIds: [stationId],
                firefighters: selectedFirefighters.map(f => f._id),
                operationType: faker.word.adjective() + " " + faker.word.noun(),
                incidentLocation: {
                    address: faker.location.streetAddress(),
                    coordinates: {
                        latitude: faker.location.latitude(),
                        longitude: faker.location.longitude(),
                    }
                },
                startTime: faker.date.recent(),
                endTime: faker.date.soon(),
                duration: faker.number.int({ min: 10, max: 180 }),
                vehiclesUsed: ['Fire Truck', 'Rescue Vehicle'].slice(0, faker.number.int({ min: 1, max: 2 })),
                equipmentUsed: ['Hose', 'Oxygen Mask', 'Ladder'].slice(0, faker.number.int({ min: 1, max: 3 })),
                casualties: {
                    civiliansInjured: faker.number.int({ min: 0, max: 5 }),
                    firefightersInjured: faker.number.int({ min: 0, max: 2 }),
                    fatalities: faker.number.int({ min: 0, max: 1 }),
                },
                estimatedDamage: faker.number.int({ min: 100000, max: 50000000 }),
                collaboratingOrganizations: ['Red Cross', 'Police', 'Emergency Services'].slice(0, faker.number.int({ min: 1, max: 3 })),
                summary: faker.lorem.sentence(),
                recommendations: faker.lorem.sentence(),
                operationPhotos: [faker.image.url(), faker.image.url(), faker.image.url()],
                createdAt: new Date()
            });
            
            const savedReport = await newReport.save();
            await Operation.updateOne({ _id: operation._id }, { reportCreated: true });
            
            await User.updateMany({ _id: { $in: selectedFirefighters.map(f => f._id) } }, { $push: { reports: savedReport._id } });
            await Station.updateOne({ _id: stationId }, { $push: { reports: savedReport._id } });
            
            console.log(`📌 گزارش برای عملیات ${operation._id} در ایستگاه ${stationId} ایجاد شد.`);
        }
    } catch (error) {
        console.error('❌ خطا در ایجاد گزارش:', error);
    } finally {
        mongoose.connection.close();
    }
};

createReportsForOperations();
