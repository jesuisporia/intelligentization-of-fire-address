const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongoosePaginate = require('mongoose-paginate');

const librarySchema = Schema({
    name : { type : String , required : false},
    description : { type : String , required : false},
    images : { type : Object , required : true },

} , { timestamps : true , toJSON : { virtuals : true } });

librarySchema.plugin(mongoosePaginate);




module.exports = mongoose.model('Library' , librarySchema);