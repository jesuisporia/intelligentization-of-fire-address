const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongoosePaginate = require('mongoose-paginate');

const mapSchema = Schema({
    lat : { type : String , required : false},
    lng : { type : String , required : false},
    token : { type : String , required : true} ,
    phone : { type : String , required : true} ,
    visit : { type : Boolean , default : false },
    approved : { type : Boolean , default : false },
    notification : { type : Boolean , default : false },
    address : { type : String , required : false},
    ip : { type : String , required : false},
    
    station : [{ type : Schema.Types.ObjectId , ref : 'Station'}],

} , { timestamps : true , toJSON : { virtuals : true } });

mapSchema.plugin(mongoosePaginate);


mapSchema.methods.inc = async function(field , num = 1) {
    this[field] += num;
    await this.save();
} 

module.exports = mongoose.model('Map' , mapSchema);