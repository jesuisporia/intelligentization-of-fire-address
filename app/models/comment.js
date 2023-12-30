const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongoosePaginate = require('mongoose-paginate');

const commentSchema = Schema({
    parent : { type : Schema.Types.ObjectId , ref : 'Comment' , default : null },
    approved : { type : Boolean , default : false },
    admin : { type : Boolean , default : false },
    post : { type : Schema.Types.ObjectId , ref : 'Post' , default : undefined },
    comment : { type : String , required  : false},
    name : { type : String , required  : false},
    email : { type : String , required  : false},
    site : { type : String , required  : false}

} , { timestamps : true , toJSON : { virtuals : true } });

commentSchema.plugin(mongoosePaginate);

commentSchema.virtual('comments' , {
    ref : 'Comment',
    localField : '_id',
    foreignField : 'parent'
});

const commentBelong = doc => {
        return 'Post'
}

commentSchema.virtual('belongTo' , {
    ref : commentBelong,
    localField : doc => commentBelong(doc).toLowerCase(),
    foreignField : '_id',
    justOne : true
})

module.exports = mongoose.model('Comment' , commentSchema);