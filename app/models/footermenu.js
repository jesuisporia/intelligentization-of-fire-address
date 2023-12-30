const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongoosePaginate = require('mongoose-paginate');

const categorySchema = Schema({
    name : { type : String , required : true},
    slug : { type : String , required : true},
    menu : { type : Schema.Types.ObjectId , default : null },
} , { timestamps : true , toJSON : { virtuals : true } });

categorySchema.plugin(mongoosePaginate);



module.exports = mongoose.model('Category' , categorySchema);