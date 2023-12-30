const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongoosePaginate = require('mongoose-paginate');

const historySchema = Schema({

    productid : { type : Schema.Types.ObjectId , ref : 'Product'},
    userid : { type : Schema.Types.ObjectId , ref : 'User'},

} , { timestamps : true , toJSON : { virtuals : true } });

historySchema.plugin(mongoosePaginate);

historySchema.virtual('history' , {
    ref : 'Product',
    localField : 'productid',
    foreignField : '_id'
})


module.exports = mongoose.model('History' , historySchema);