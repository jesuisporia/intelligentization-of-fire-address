const mongoose = require('mongoose');

const externalAgencySchema = new mongoose.Schema({
  name: { type: String, required: true },
  operation: { type: mongoose.Schema.Types.ObjectId, ref: 'Operation' },
});

const ExternalAgency = mongoose.model('ExternalAgency', externalAgencySchema);
module.exports = ExternalAgency;
