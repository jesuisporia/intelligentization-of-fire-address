const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongoosePaginate = require('mongoose-paginate');

const payamSchema = Schema({
    user : { type : Schema.Types.ObjectId , ref : 'User' },
    payam : { type : String , required : true },
    visited : { type : Boolean , default : false },
} , { timestamps : true , toJSON : { virtuals : true } });

payamSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Payam' , payamSchema);