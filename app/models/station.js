const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');
const uniqueString = require('unique-string')
const mongoosePaginate = require('mongoose-paginate');

const stationSchema = Schema({ 
  name: String,
  reports: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Report' }],
  personnel: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Firefighter' }],
  operations: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Operation' }] ,
  stationID: { type: String, required: true, unique: true },
  stationName: { type: String, required: true },
  stationAddress: { type: String, required: true },
  establishmentDate: { type: Date, required: true },
  stationChief: { type: String, required: true },
  stationPhoneNumber: { type: String, required: true },
  stationEmail: { type: String, required: true },
  stationStatus: { type: String, required: true },
  geographicalCoordinates: {
      latitude: { type: Number, required: true },
      longitude: { type: Number, required: true }
  },
  coverageArea: { type: String, required: true },
  accessToHighways: { type: String, required: true },
  availableEquipment: [String],
  numberOfVehicles: { type: Number, required: true },
  equipmentMaintenanceStatus: { type: String, required: true },
  dormitoryFacilities: { type: String, required: true },
  communicationCoverage: { type: String, required: true },
  numberOfFirefighters: { type: Number, required: true },
  workShifts: [String],
  personnelList: [String],
  trainingCourses: [String],
  numberOfOperations: { type: Number, required: true },
  responseTimeToIncidents: { type: String, required: true },
  stationPerformance: { type: String, required: true },
  damageAndCasualties: { type: String, required: true },
  stationBudget: { type: Number, required: true },
  insuranceAndLegalSupport: { type: String, required: true },
  culturalAndSocialActivities: [String],
  retrainingPrograms: [String]
});

stationSchema.plugin(mongoosePaginate);


// stationSchema.pre('save' , function(next) {
//     let salt = bcrypt.genSaltSync(15);
//     let hash = bcrypt.hashSync(this.password , salt);
//     this.password = hash;
//     console.log(this.password)
//     next();
// });

// stationSchema.pre('findOneAndUpdate' , function(next) {
//     let salt = bcrypt.genSaltSync(15);
//     let hash = bcrypt.hashSync(this.getUpdate().$set.password , salt);

//     this.getUpdate().$set.password = hash;
//     next();
// });

// stationSchema.methods.comparePassword = function(password) {
//     return bcrypt.compareSync(password , this.password);
// }







module.exports = mongoose.model('Station' , stationSchema);