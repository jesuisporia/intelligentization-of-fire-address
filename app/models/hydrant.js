const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongoosePaginate = require('mongoose-paginate');

const hydrantSchema = Schema({
    latlng : { type : Object , required : false },
    address: { type : String , required : false },

    visited : { type : Boolean , default : false },
} , { timestamps : true , toJSON : { virtuals : true } });

hydrantSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Hydrant' , hydrantSchema);