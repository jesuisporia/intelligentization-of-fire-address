const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongoosePaginate = require('mongoose-paginate');

const categoryvideoSchema = Schema({
    name : { type : String , required : true},
    slug : { type : String , required : true},
    parent : { type : Schema.Types.ObjectId , ref : 'CategoryVideo' , default : null },
} , { timestamps : true , toJSON : { virtuals : true } });

categoryvideoSchema.plugin(mongoosePaginate);

categoryvideoSchema.virtual('childs' , {
    ref : 'CategoryVideo',
    localField : '_id',
    foreignField : 'parent'
});


module.exports = mongoose.model('CategoryVideo' , categoryvideoSchema);