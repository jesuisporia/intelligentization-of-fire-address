const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongoosePaginate = require('mongoose-paginate');

const fireSchema = Schema({
    lat : { type : String , required : false},
    lng : { type : String , required : false},
    address: { type : String , required : false },
    postal_address: { type : String , required : false },
    address_compact: { type : String , required : false },
    primary: { type : String , required : false },
    name: { type : String , required : false },
    poi: { type : String , required : false },
    country: { type : String , required : false },
    province: { type : String , required : false },
    county: { type : String , required : false },
    district: { type : String , required : false },
    rural_district: { type : String , required : false },
    city: { type : String , required : false },
    village: { type : String , required : false },
    region:{ type : String , required : false },
    neighbourhood: { type : String , required : false },
    last: { type : String , required : false },
    plaque: { type : String , required : false },
    postal_code:{ type : String , required : false },

    visit : { type : Boolean , default : false },
} , { timestamps : true , toJSON : { virtuals : true } });

fireSchema.plugin(mongoosePaginate);


fireSchema.methods.inc = async function(field , num = 1) {
    this[field] += num;
    await this.save();
} 

module.exports = mongoose.model('Fire' , fireSchema);