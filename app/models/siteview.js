const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongoosePaginate = require('mongoose-paginate');

const siteviewSchema = Schema({

    viewCount : { type : Number , default : 0 },
    realviewCount : { type : Number , default : 0 },
    time : { type : String , default : 0 },

} , { timestamps : true , toJSON : { virtuals : true } });

siteviewSchema.plugin(mongoosePaginate);




module.exports = mongoose.model('Siteview' , siteviewSchema);