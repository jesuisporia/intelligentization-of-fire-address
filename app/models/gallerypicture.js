const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongoosePaginate = require('mongoose-paginate');

const gallerypictureSchema = Schema({
    title : { type : String , required : true},
    description : { type : String , required : true},
    images : { type : Object , required : true },
    approved : { type : Boolean , default : false },
    like : { type : Object , required : false },
    timestamp : { type : String , required : false },
    // parent : { type : Schema.Types.ObjectId , ref : 'Gallerypicture' , default : null },

    // viewcount : { type : Object , required : true },
    // user : { type : Schema.Types.ObjectId , ref : 'User'},
    // categories : [{ type : Schema.Types.ObjectId , ref : 'Category'}],
} , { timestamps : true , toJSON : { virtuals : true } });

gallerypictureSchema.plugin(mongoosePaginate);

gallerypictureSchema.virtual('childs' , {
    ref : 'Gallerypicture',
    localField : '_id',
    foreignField : 'parent'
});


module.exports = mongoose.model('Gallerypicture' , gallerypictureSchema);