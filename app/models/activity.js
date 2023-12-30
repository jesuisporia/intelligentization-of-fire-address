const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongoosePaginate = require('mongoose-paginate');

const activitySchema = Schema({
    title : { type : String , required : false},
    description : { type : String , required : false},
    typractivity : { type : String , required : false},
    mac : { type : String , required : false},
    date : { type : String , required : false},
    statement : { type : String , required : false},
    username : { type : String , required : false},
    user : { type : Schema.Types.ObjectId , ref : 'User' , default : null },
    
    visit : { type : Boolean , default : false },
} , { timestamps : true , toJSON : { virtuals : true } });




module.exports = mongoose.model('Activity' , activitySchema);