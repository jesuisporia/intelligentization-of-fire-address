const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongoosePaginate = require('mongoose-paginate');

const reportRegistrationchartSchema = Schema({
    name : { type : String , required : false },
    visit : { type : Boolean , default : false },
    approved : { type : Boolean , default : false },
    notification : { type : Boolean , default : false },
    address : { type : String , required : false},
    ip : { type : String , required : false},
    count : { type : Number , required : false},
    station : { type : Schema.Types.ObjectId , ref : 'Station'},
} , { timestamps : true , toJSON : { virtuals : true } });

reportRegistrationchartSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('ReportRegistrationchart' , reportRegistrationchartSchema);