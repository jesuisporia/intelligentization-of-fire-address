const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');
const uniqueString = require('unique-string')
const mongoosePaginate = require('mongoose-paginate');

const logincheckSchema = Schema({
    name : { type : String , required : false },
    count : { type : String , required : false },
    phone : { type : String , required : false },
    ip : { type : String , required : false },
    userid : { type : Schema.Types.ObjectId , ref : 'User'},
} , { timestamps : true , toJSON : { virtuals : true } });

logincheckSchema.plugin(mongoosePaginate);





module.exports = mongoose.model('Logincheck' , logincheckSchema);