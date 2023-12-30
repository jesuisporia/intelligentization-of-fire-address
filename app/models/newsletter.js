const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongoosePaginate = require('mongoose-paginate');

const newsletterSchema = Schema({
    email : { type : String , required : false},
    name : { type : String , required : false},
    phone : { type : String , required : false},
    approved : { type : Boolean , default : true },
} , { timestamps : true , toJSON : { virtuals : true } });

newsletterSchema.plugin(mongoosePaginate);




module.exports = mongoose.model('Newsletter' , newsletterSchema);