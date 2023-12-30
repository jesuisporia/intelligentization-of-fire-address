const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongoosePaginate = require('mongoose-paginate');

const mapchartSchema = Schema({
    lat : { type : String , required : false},
    lng : { type : String , required : false},
    token : { type : String , required : false} ,

    visit : { type : Boolean , default : false },
    approved : { type : Boolean , default : false },
    notification : { type : Boolean , default : false },
    address : { type : String , required : false},
    ip : { type : String , required : false},
    count : { type : Number , required : false},
    station : { type : Schema.Types.ObjectId , ref : 'Station'},

} , { timestamps : true , toJSON : { virtuals : true } });

mapchartSchema.plugin(mongoosePaginate);


mapchartSchema.methods.inc = async function(field , num = 1) {
    this[field] += num;
    await this.save();
} 

module.exports = mongoose.model('Mapchart' , mapchartSchema);