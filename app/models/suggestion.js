const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongoosePaginate = require('mongoose-paginate');

const suggestionSchema = Schema({
    name : { type : String , required : true },
    phone : { type : String , required : true },
    payam : { type : String , required : true },
    visited : { type : Boolean , default : false },
} , { timestamps : true , toJSON : { virtuals : true } });

suggestionSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Suggestion' , suggestionSchema);