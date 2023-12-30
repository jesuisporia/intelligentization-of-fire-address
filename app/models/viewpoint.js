const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongoosePaginate = require('mongoose-paginate');

const viewpointSchema = Schema({
    user : { type : Schema.Types.Object , ref : 'User'},
    approved : { type : Boolean , default : false },
    trash : { type : Boolean , default : false },
    product : { type : Schema.Types.ObjectId , ref : 'Product' , default : undefined },
    comment : { type : String , required  : false},

} , { timestamps : true , toJSON : { virtuals : true } });

viewpointSchema.plugin(mongoosePaginate);

viewpointSchema.virtual('comments' , {
    ref : 'Viewpoint',
    localField : '_id',
    foreignField : 'parent'
});

const commentBelong = doc => {
        return 'Product';
}


viewpointSchema.virtual('belongTo' , {
    ref : commentBelong,
    localField : doc => commentBelong(doc).toLowerCase(),
    foreignField : '_id',
    justOne : true
})



module.exports = mongoose.model('Viewpoint' , viewpointSchema);