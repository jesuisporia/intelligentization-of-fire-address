const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongoosePaginate = require('mongoose-paginate');

const chateSchema = Schema({
    user : { type : Schema.Types.ObjectId , ref : 'User' },
    date : { type : String , required : true },
    time : { type : String , required : true },
    address : { type : String , required : true },
    owner : { type : String , required : true },
    tenant : { type : String , required : true },
    profile : { type : String , required : true },
    chate : { type : String , required : true },
    visited : { type : Boolean , default : false },
} , { timestamps : true , toJSON : { virtuals : true } });

chateSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Chate' , chateSchema);