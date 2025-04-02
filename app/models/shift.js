const mongoose = require('mongoose');

const shiftSchema = new mongoose.Schema({
  shiftDate: { type: Date, required: true },
  dayShift: { type: mongoose.Schema.Types.ObjectId, ref: 'GuardDuty' },
  nightShift: { type: mongoose.Schema.Types.ObjectId, ref: 'GuardDuty' },
});

const Shift = mongoose.model('Shift', shiftSchema);
module.exports = Shift;
