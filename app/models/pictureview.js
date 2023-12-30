const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongoosePaginate = require('mongoose-paginate');

const pictureviewSchema = Schema({
    viewCount : { type : Number , default : 0 },
    gallerypicture : { type : Object , required : false },

    // gallerypicture : [{ type : Schema.Types.ObjectId , ref : 'Gallerypicture'}],
} , { timestamps : true , toJSON : { virtuals : true } });

pictureviewSchema.plugin(mongoosePaginate);




module.exports = mongoose.model('pictureview' , pictureviewSchema);