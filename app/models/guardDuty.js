const mongoose = require('mongoose');

const guardDutySchema = new mongoose.Schema({
  firefighter: { type: mongoose.Schema.Types.ObjectId, ref: 'Firefighter', required: true },
  isSubstitute: { type: Boolean, default: false }, // نشان‌دهنده این که آتش‌نشان جایگزین است یا نه
  shiftType: { type: String, enum: ['day', 'night'], required: true }, // شیفت روز یا شب
  shiftStart: { type: Date, required: true },
  shiftEnd: { type: Date, required: true },
});

const GuardDuty = mongoose.model('GuardDuty', guardDutySchema);
module.exports = GuardDuty;
