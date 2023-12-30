const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongoosePaginate = require('mongoose-paginate');
   
const postSchema = Schema({
    user : { type : Schema.Types.Object , ref : 'User'},
    categories : [{ type : Schema.Types.ObjectId , ref : 'Category'}],
    approved : { type : Boolean , default : true },
    canonical : { type : String , required : false },
    title : { type : String , required : true },
    slug : { type : String , required : true },
    body : { type : String , required : true },
    metaDescription : { type : String , required : true },
    titleSeo : { type : String , required : true },
    keySeo : { type : String , required : true },
    timestamp : { type : String , required : false , default : new Date().toISOString() },
    condition : { type : Number ,  default : 0 },
    images : { type : Object , required : true },
    thumb : { type : String , required : false },
    viewCount : { type : Number , default : 0 },
    commentCount : { type : Number , default : 0 },
} , { timestamps : true , toJSON : { virtuals : true } });

postSchema.plugin(mongoosePaginate);



postSchema.methods.path = function() {
    return `/Post/${this.slug}`;
}

postSchema.methods.inc = async function(field , num = 1) {
    this[field] += num;
    await this.save();
} 

postSchema.methods.dic = async function(field , num = 1) {
    this[field] -= num;
    await this.save();
} 


postSchema.virtual('comments' , {
    ref : 'Comment',
    localField : '_id',
    foreignField : 'post'
})


module.exports = mongoose.model('Post' , postSchema);