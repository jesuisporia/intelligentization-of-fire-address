const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongoosePaginate = require('mongoose-paginate');

const chateSchema = Schema({
    user : { type : Schema.Types.ObjectId , ref : 'User' },
    chate : { type : String , required : true },
    visited : { type : Boolean , default : false },
} , { timestamps : true , toJSON : { virtuals : true } });

chateSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Chate' , chateSchema);