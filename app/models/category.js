const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongoosePaginate = require('mongoose-paginate');

const categorySchema = Schema({
    title : { type : String , required : false},
    description : { type : String , required : false},
    parent : { type : Schema.Types.ObjectId , ref : 'Category' , default : null },

    visit : { type : Boolean , default : false },
} , { timestamps : true , toJSON : { virtuals : true } });

categorySchema.plugin(mongoosePaginate);



module.exports = mongoose.model('Category' , categorySchema);