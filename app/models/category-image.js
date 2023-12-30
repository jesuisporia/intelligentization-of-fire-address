const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongoosePaginate = require('mongoose-paginate');

const categoryimageSchema = Schema({
    name : { type : String , required : true},
    slug : { type : String , required : true},
    parent : { type : Schema.Types.ObjectId , ref : 'CategoryImage' , default : null },
} , { timestamps : true , toJSON : { virtuals : true } });

categoryimageSchema.plugin(mongoosePaginate);

categoryimageSchema.virtual('childs' , {
    ref : 'CategoryImage',
    localField : '_id',
    foreignField : 'parent'
});


module.exports = mongoose.model('CategoryImage' , categoryimageSchema);